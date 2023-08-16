const videoElement = document.getElementById('video');
const button = document.getElementById('button');

let mediaStream = null;

// Function to select the media stream for sharing the screen
async function selectMediaStream() {
    try {
        // Get the display media stream
        mediaStream = await navigator.mediaDevices.getDisplayMedia();
        // Set the media stream as the source of the video element
        videoElement.srcObject = mediaStream;
        // When metadata of the video is loaded, play the video and show it
        videoElement.onloadedmetadata = () => {
            videoElement.play();
            videoElement.hidden = false;
        };
    } catch (error) {
        console.log('Error:', error);
    }
}

// Event listener for the button click
button.addEventListener('click', async () => {
    // If there is no media stream, select one
    if (!mediaStream) {
        await selectMediaStream();
    }
    
    // Disable the button to prevent multiple clicks
    button.disabled = true;
    try {
        // Request Picture-in-Picture mode for the video element
        await videoElement.requestPictureInPicture();
    } catch (error) {
        console.log('Error:', error);
    } finally {
        // Enable the button after Picture-in-Picture mode is exited
        button.disabled = false;
    }
});

// Listen for the "enterpictureinpicture" event to hide the video element when entering PiP mode
videoElement.addEventListener('enterpictureinpicture', () => {
    videoElement.hidden = true;
});

// Listen for the "leavepictureinpicture" event to show the video element again when exiting PiP mode
videoElement.addEventListener('leavepictureinpicture', () => {
    videoElement.hidden = false;
});

// On Load
// Enable video controls
videoElement.controls = true;