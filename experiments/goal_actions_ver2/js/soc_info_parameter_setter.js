// ---------------- 2. STIMULUS SETUP ------------------
// Parameters and Stimulus Setup

// Defining the parameters for the study:

// Number of actions on the critical trial
var num_actions = 3

/* Call Maker getter to get cond variables
 * Takes number and counts for each condition
 * Returns a condition number
 */

var numConditions = 3
var slider_start_val = "50"

try {
    var filename = "soc_info_goals_pilotB";
    var condCounts = "1,25;2,25";
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://langcog.stanford.edu/cgi-bin/KM/subject_equalizer_km/maker_getter.php?conds=" + condCounts + "&filename=" + filename, false );
    xmlHttp.send( null );
    var cond = xmlHttp.responseText; // For actual experimental runs
} catch (e) {
    var cond = random(1,numConditions); // if maker-getter fails, generate condition number randomly
}

cond = cond.toString();

// set up experiment variables based on condition

switch (cond) {
    case "1":
        goal_condition = "learning";
        break;
    case "2":
        goal_condition = "performance";
        break;
    case "3":
        goal_condition = "presentation";
        break
}

var bonus_amount = '10 cent'

if(goal_condition == "learning") {
    goal_text_html = `Your supervisor comes along and says, "The toy is missing the label! Can you figure out whether this toy is a "ButtonMusic toy", "HandleMusic toy", or "BothMusicLight toy"? <br><br> You get a chance to try <b>ONE action to figure out which toy this is</b>, and you will get a ${bonus_amount} bonus after submitting the HIT if you figure it out correctly.`
    goal_html_action_slide = `Remember, you will receive a <b> ${bonus_amount} bonus if you correctly learn which toy this is</b>. You will lose out on this bonus if you don’t learn which toy it is.`
} else if (goal_condition == "performance") {
    goal_text_html = `"Your supervisor comes along and says, "That must be your new toy! Can you make it play music? <br><br> You get a chance to take <b>ONE action to make the toy play music</b>, and you will get a ${bonus_amount} bonus if the toy plays music."
`
    goal_html_action_slide = `Remember, you will receive a <b>${bonus_amount} bonus if you make the toy play music</b>. You will lose out on this bonus if your action doesn't make the toy play music.`
} else {
    goal_text_html = `Your supervisor comes along and says, "What is that thing?" You want to impress your supervisor and show that you're an expert with the toy. <br><br>
You get a chance to take <b>ONE action to impress your supervisor</b>, and you will get a ${bonus_amount} if he is impressed.
`
    goal_html_action_slide = `Remember, you will receive a <b>${bonus_amount} bonus if you successfully impress your supervisor by selecting ONE action </b>. You will lose out on this bonus if your supervisor is not impressed.`    
}

// set up variables for later randomization
//music_box_imgs =  ["music_box_left.jpeg", "music_box_right.jpeg"]
//music_box = music_box_imgs[random(0,1)]
//music_box_html = `<img src="imgs/${music_box}" height="200" width="300">`
music_box_imgs =  ["BothMusicLight.jpeg", "ButtonMusic.jpeg", "HandleMusic.jpeg"]
music_box = shuffle(music_box_imgs)
    for(i = 0; i < music_box.length; i++) {
        music_box_html = `<img src="imgs/${music_box[i]}" height="120" width="200">`
    	$(`#music_box_intro_` + i.toString()).html(music_box_html);
    	$(`#music_box_goals_` + i.toString()).html(music_box_html);
    	$(`#music_box_actions_` + i.toString()).html(music_box_html);
    	$(`#music_box_hyps_` + i.toString()).html(music_box_html);
    }

//hypotheses_slider_labels = ["Purple" , "Orange", "Purple and Orange"]
//action_labels = ["Purple" , "Orange", "Purple and Orange"]
hypotheses_slider_labels = ["ButtonMusic" , "HandleMusic", "BothMusicLight"]
action_labels = ["Press the button" , "Pull the handle", "Press the button and pull the handle"]
effect_labels = ["play music" , "turn on the light"]
