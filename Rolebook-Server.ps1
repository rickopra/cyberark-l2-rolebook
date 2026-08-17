param([switch]$NoBrowser)
$ErrorActionPreference='Stop'
$Root=Split-Path -Parent $MyInvocation.MyCommand.Path
$DataDir=Join-Path $Root 'data'
$ProgressPath=Join-Path $DataDir 'progress.json'
$LockPath=Join-Path $DataDir 'server.json'
New-Item -ItemType Directory -Force -Path $DataDir | Out-Null
$Utf8=New-Object Text.UTF8Encoding($false)
function Open-Rolebook([int]$Port){Start-Process ("http://127.0.0.1:{0}/" -f $Port)}
if(Test-Path $LockPath){
  try{
    $existing=Get-Content -LiteralPath $LockPath -Raw | ConvertFrom-Json
    $health=Invoke-WebRequest -UseBasicParsing -Uri ("http://127.0.0.1:{0}/api/health" -f $existing.port) -TimeoutSec 1
    if($health.StatusCode -eq 200){if(-not $NoBrowser){Open-Rolebook $existing.port};exit}
  }catch{}
  Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
}
$Listener=$null
$Port=0
foreach($candidate in 8765..8795){
  try{$test=New-Object Net.Sockets.TcpListener([Net.IPAddress]::Loopback,$candidate);$test.Start();$Listener=$test;$Port=$candidate;break}catch{}
}
if(-not $Listener){Add-Type -AssemblyName PresentationFramework;[Windows.MessageBox]::Show('Tidak dapat membuka local port 8765-8795. Tutup aplikasi yang memakai port tersebut lalu coba lagi.','CyberArk Rolebook')|Out-Null;exit 1}
[IO.File]::WriteAllText($LockPath,(@{pid=$PID;port=$Port;started=(Get-Date).ToString('o')}|ConvertTo-Json -Compress),$Utf8)
function Find-HeaderEnd([byte[]]$Bytes){for($i=0;$i -le $Bytes.Length-4;$i++){if($Bytes[$i]-eq 13 -and $Bytes[$i+1]-eq 10 -and $Bytes[$i+2]-eq 13 -and $Bytes[$i+3]-eq 10){return $i}};return -1}
function Read-Request($Stream){
  $memory=New-Object IO.MemoryStream
  $buffer=New-Object byte[] 8192
  $headerEnd=-1;$contentLength=0
  while($memory.Length -lt 10485760){
    $read=$Stream.Read($buffer,0,$buffer.Length);if($read -le 0){break}
    $memory.Write($buffer,0,$read);$bytes=$memory.ToArray()
    if($headerEnd -lt 0){
      $headerEnd=Find-HeaderEnd $bytes
      if($headerEnd -ge 0){
        $headerText=[Text.Encoding]::ASCII.GetString($bytes,0,$headerEnd)
        foreach($line in ($headerText -split "`r`n")){if($line -match '^Content-Length:\s*(\d+)'){ $contentLength=[int]$Matches[1] }}
      }
    }
    if($headerEnd -ge 0 -and $bytes.Length-($headerEnd+4) -ge $contentLength){break}
  }
  $all=$memory.ToArray();if($headerEnd -lt 0){return $null}
  $header=[Text.Encoding]::ASCII.GetString($all,0,$headerEnd);$lines=$header -split "`r`n";$first=$lines[0] -split ' '
  if($first.Count -lt 2){return $null}
  $body='';if($contentLength -gt 0){$body=[Text.Encoding]::UTF8.GetString($all,$headerEnd+4,$contentLength)}
  [pscustomobject]@{Method=$first[0];Path=$first[1].Split('?')[0];Body=$body;Length=$contentLength}
}
function Read-SharedBytes([string]$Path){
  $fileStream=[IO.File]::Open($Path,[IO.FileMode]::Open,[IO.FileAccess]::Read,[IO.FileShare]::ReadWrite)
  try{$memory=New-Object IO.MemoryStream;$fileStream.CopyTo($memory);return $memory.ToArray()}finally{$fileStream.Dispose();if($memory){$memory.Dispose()}}
}
function Send-Response($Stream,[int]$Code,[string]$Type,[byte[]]$Body){
  $reason=@{200='OK';400='Bad Request';404='Not Found';405='Method Not Allowed';413='Payload Too Large';500='Internal Server Error'}[$Code]
  $head="HTTP/1.1 $Code $reason`r`nContent-Type: $Type`r`nContent-Length: $($Body.Length)`r`nCache-Control: no-store`r`nX-Content-Type-Options: nosniff`r`nConnection: close`r`n`r`n"
  $headBytes=[Text.Encoding]::ASCII.GetBytes($head);$Stream.Write($headBytes,0,$headBytes.Length);$Stream.Write($Body,0,$Body.Length);$Stream.Flush()
}
function Send-Text($Stream,[int]$Code,[string]$Text,[string]$Type='application/json; charset=utf-8'){Send-Response $Stream $Code $Type ([Text.Encoding]::UTF8.GetBytes($Text))}
$Static=@{
  '/'='CyberArk_L2_Rolebook.html'
  '/CyberArk_L2_Rolebook.html'='CyberArk_L2_Rolebook.html'
  '/CyberArk_L2_Mastercourse.html'='CyberArk_L2_Mastercourse.html'
  '/CyberArk_L2_Learning_App.html'='CyberArk_L2_Learning_App.html'
  '/rolebook-assets/rolebook.css'='rolebook-assets\rolebook.css'
  '/rolebook-assets/rolebook-theme.css'='rolebook-assets\rolebook-theme.css'
  '/rolebook-assets/rolebook.js'='rolebook-assets\rolebook.js'
  '/rolebook-assets/course-data.js'='rolebook-assets\course-data.js'
  '/rolebook-assets/reference-data.js'='rolebook-assets\reference-data.js'
  '/rolebook-assets/reference-sources.js'='rolebook-assets\reference-sources.js'
  '/rolebook-assets/reference-deep-core.js'='rolebook-assets\reference-deep-core.js'
  '/rolebook-assets/reference-deep-objects.js'='rolebook-assets\reference-deep-objects.js'
  '/rolebook-assets/reference-deep-architecture.js'='rolebook-assets\reference-deep-architecture.js'
  '/rolebook-assets/reference-finalize.js'='rolebook-assets\reference-finalize.js'
  '/rolebook-assets/reference-expansion.js'='rolebook-assets\reference-expansion.js'
  '/rolebook-assets/reference-docs-atlas.js'='rolebook-assets\reference-docs-atlas.js'
  '/rolebook-assets/cyberark-docs-index.js'='rolebook-assets\cyberark-docs-index.js'
  '/rolebook-assets/rolebook-library-helpers.js'='rolebook-assets\rolebook-library-helpers.js'
  '/rolebook-assets/inject-cyberbrainer.js'='rolebook-assets\inject-cyberbrainer.js'
  '/rolebook-assets/idira-training-details.js'='rolebook-assets\idira-training-details.js'
  '/rolebook-assets/idira-training-chapters.js'='rolebook-assets\idira-training-chapters.js'
  '/rolebook-assets/idira-training-expansions.js'='rolebook-assets\idira-training-expansions.js'
  '/rolebook-assets/inject-idira-training.js'='rolebook-assets\inject-idira-training.js'
  '/rolebook-assets/docs-explorer.js'='rolebook-assets\docs-explorer.js'
  '/rolebook-assets/icon-idira-logo.svg'='rolebook-assets\icon-idira-logo.svg'
  '/CyberArk_L2_Support_Engineer_Rolebook_Ricko(1).docx'='CyberArk_L2_Support_Engineer_Rolebook_Ricko(1).docx'
}
if(-not $NoBrowser){Open-Rolebook $Port}
try{
  while($true){
    $client=$Listener.AcceptTcpClient()
    try{
      $stream=$client.GetStream();$request=Read-Request $stream
      if(-not $request){Send-Text $stream 400 '{"ok":false}';continue}
      if($request.Path -eq '/api/health'){Send-Text $stream 200 '{"ok":true}';continue}
      if($request.Path -eq '/api/progress' -and $request.Method -eq 'GET'){
        $data=if(Test-Path $ProgressPath){[IO.File]::ReadAllText($ProgressPath)}else{'null'}
        Send-Text $stream 200 ('{"ok":true,"data":'+$data+'}');continue
      }
      if($request.Path -eq '/api/progress' -and $request.Method -eq 'POST'){
        if($request.Length -gt 5242880){Send-Text $stream 413 '{"ok":false,"error":"too_large"}';continue}
        try{$parsed=$request.Body|ConvertFrom-Json;if(-not $parsed){throw 'invalid'}}catch{Send-Text $stream 400 '{"ok":false,"error":"invalid_json"}';continue}
        $temp=$ProgressPath+'.tmp';[IO.File]::WriteAllText($temp,$request.Body,$Utf8);Move-Item -LiteralPath $temp -Destination $ProgressPath -Force
        Send-Text $stream 200 '{"ok":true}';continue
      }
      if($Static.ContainsKey($request.Path)){
        $file=Join-Path $Root $Static[$request.Path]
        if(Test-Path $file){
          $ext=[IO.Path]::GetExtension($file).ToLowerInvariant();$type=@{'.html'='text/html; charset=utf-8';'.css'='text/css; charset=utf-8';'.js'='application/javascript; charset=utf-8';'.svg'='image/svg+xml';'.docx'='application/vnd.openxmlformats-officedocument.wordprocessingml.document'}[$ext]
          Send-Response $stream 200 $type (Read-SharedBytes $file);continue
        }
      }
      Send-Text $stream 404 '{"ok":false,"error":"not_found"}'
    }catch{try{Send-Text $stream 500 '{"ok":false,"error":"server_error"}'}catch{}}finally{$client.Close()}
  }
}finally{$Listener.Stop();if(Test-Path $LockPath){Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue}}




