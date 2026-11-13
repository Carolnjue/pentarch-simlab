<?php
/**
 * Pentarch SimLab auto-deploy.
 * Pulls the latest Carolnjue/pentarch-simlab (main) from GitHub and copies it into the
 * simlab subdomain folder. Runs from a DirectAdmin cron job; it is stored outside public_html.
 */
$repo   = 'Carolnjue/pentarch-simlab';
$target = __DIR__ . '/public_html/simlab';   // /home/<user>/domains/pentarchcommunications.com/public_html/simlab (script lives in domains/pentarchcommunications.com)
$state  = __DIR__ . '/simlab-sync.sha';
$log    = __DIR__ . '/simlab-sync.log';

function http_get($url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_FOLLOWLOCATION => true, CURLOPT_TIMEOUT => 120,
        CURLOPT_USERAGENT => 'pentarch-simlab-sync', CURLOPT_HTTPHEADER => ['Accept: application/vnd.github+json']]);
    $body = curl_exec($ch); $code = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
    return $code === 200 ? $body : false;
}
function logm($m) { global $log; file_put_contents($log, date('c') . ' ' . $m . "\n", FILE_APPEND); }

$info = http_get("https://api.github.com/repos/$repo/commits/main");
if (!$info) { logm('could not read latest commit'); exit; }
$sha = json_decode($info, true)['sha'] ?? '';
if ($sha && is_file($state) && trim(file_get_contents($state)) === $sha && empty($argv[1])) exit; // nothing new

$zip = http_get("https://codeload.github.com/$repo/zip/$sha");
if (!$zip) { logm("download failed for $sha"); exit; }
$tmp = sys_get_temp_dir() . '/simlab-' . getmypid() . '.zip';
file_put_contents($tmp, $zip);
$za = new ZipArchive();
if ($za->open($tmp) !== true) { logm('bad zip'); exit; }
$n = 0;
for ($i = 0; $i < $za->numFiles; $i++) {
    $name = $za->getNameIndex($i);
    $rel = preg_replace('#^[^/]+/#', '', $name);                 // strip "pentarch-simlab-<sha>/"
    if ($rel === '' || substr($rel, -1) === '/') continue;
    if (preg_match('#(^|/)\.|\.md$|\.php$#i', $rel)) continue;   // never deploy dotfiles, markdown or PHP
    $dest = $target . '/' . $rel;
    if (!is_dir(dirname($dest))) mkdir(dirname($dest), 0755, true);
    file_put_contents($dest, $za->getFromIndex($i)); $n++;
}
$za->close(); unlink($tmp);
file_put_contents($state, $sha);
logm("deployed $sha ($n files)");
