<?php
header('Content-Type: application/json');

/**
 * Find the position of the Xth occurrence of a substring in a string
 * @param $haystack
 * @param $needle
 * @param $number integer > 0
 * @return int
 */
function strposX($haystack, $needle, $number){
    if($number == 1){
        return strpos($haystack, $needle);
    }
    return strpos($haystack, $needle, strposX($haystack, $needle, $number - 1) + strlen($needle));
}

/**
 * Converts sea wave period to sound frequency
 * @param $period
 * @return int
 */
function period_to_frequency($period){
    $freq = 1/$period;
    $scale = 100.0;
    return $freq*$scale;    
}

/**
 * Converts wave height to volume, between 0-2ish is best
 * @param $period
 * @return int
 */
function height_to_volume($height){
    $scale = 0.6;
    return $height*$scale + 0.3;    
}

/**gainNode
 * Converts wave volume & frequency to requency
 * @param $period
 * @return RGB array
 */
function make_color($volume, $frequency){
    $r = min(($frequency*2.1)/$volume, 255);
    $g = min(($frequency*2.1)+($volume*45), 255);
    $b = min(($frequency*2.35)*$volume, 255);
    return array($r, $g, $b);    
}

$error_response  = array("error" => "no buoy data");

// Get the web page
$html = file_get_contents('http://www.met.ie/latest/buoy.asp');

$buoy_index = 0;
if(isset($_GET['buoy'])){
    $buoy_index = $_GET['buoy'];
}

$search_for = '<td class="underliner12" align=center >';
// Find the 9th time "$search_for" occurs
$pos = strposX($html, $search_for, 9 + 11*$buoy_index);
// Add on the lenght of "$search_for" get the position of its end
$pos += strlen($search_for);
// text is everything after "$search_for" e.g. text = "     0.4 </td"
$text = substr($html, $pos, 15);
if(strpos($text, 'n/a')!==false){
    echo json_encode($error_response);
    http_response_code(404);
    exit();
}
// Get everythong before the "<"
$period = trim(explode('<', $text)[0]);


// Repeat for the 10th time
$pos = strposX($html, $search_for, 10 + 11*$buoy_index);
// Add on the lenght of "$search_for" get the position of its end
$pos += strlen($search_for);
// text is everything after "$search_for" e.g. text = "     0.4 </td"
$text = substr($html, $pos, 15);
if(strpos($text, 'n/a')!==false){
    echo json_encode($error_response);
    http_response_code(404);
    exit();
}
// Get everythong before the "<"
$height = trim(explode('<', $text)[0]);


$frequency = period_to_frequency($period);
$volume    = height_to_volume($height);
$RGB       = make_color($volume, $frequency); 
$response  = array("frequency"=>$frequency,
                     "volume"=>$volume,
                     "color"=> $RGB);

echo json_encode($response);
