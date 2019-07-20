<?php
$file_path = "./data/assign13.json";

$current_data = file_get_contents($file_path);
$array_data = json_decode($current_data, true);
$new_data = array();
foreach($_POST as $name => $value) {
    $new_data[$name] = $value;
}
array_push($array_data, $new_data);
$newJson = json_encode($array_data);

$fp = fopen($file_path, "w");
fwrite($fp, $newJson);
fclose($fp);

$fileContents = file_get_contents($file_path);
echo $fileContents;
?>