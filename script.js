const api = "https://api.adviceslip.com/advice";
const number = document.querySelector(".number");
const text = document.querySelector(".blurb");
const loadingText = document.querySelector('.loading');

async function getAdvice() {
  loadingText.hidden = false;

  try {
    const response = await fetch(api, { cache: "no-cache" });
    const data = await response.json();
    
    const { id, advice } = data.slip;
    
    number.innerHTML = `advice # ${id}`;
    text.innerHTML = advice;
    loadingText.hidden = true;
  } catch (error) {
    console.error(error);
  }
}