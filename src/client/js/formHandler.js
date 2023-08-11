import { isValid } from "./inputChecker"

const handleSubmit = async (e) => {
	e.preventDefault()

	let url = document.getElementById('input-stmt').value
	console.log('::: Form Submitted :::')
	console.log("User's text input is: ", url)

    if (isValid(url) == true) {
        try {
            const res = await fetch('/postData', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url: url }),
            })
            const data = await res.json()
            updateUI(data)
        } catch (err) {
            console.log('Error thrown', err)
        }
    } else {
        alert("Invalid URL!!");
    }
}


function updatePolarity(polarity) {
    let polarity_value = "P"
    if(polarity == "P+") {
        polarity_value = "Strong Positive"
    } else if(polarity == "P") {
        polarity_value = "Positive"
    } else if(polarity == "NEU") {
        polarity_value = "Neutral"
    } else if(polarity == "N") {
        polarity_value = "Negative"
    } else if(polarity == "N+") {
        polarity_value = "Strong Negative"
    } else {
        polarity_value = "Without Polarity"
    }
    return polarity_value;
}

const updateUI = async (resData) => {
	document.querySelector('#values .polarity .category-val').innerHTML = `Polarity: ` + updatePolarity(resData.score_tag)
	document.querySelector('#values .agreement .category-val').innerHTML = `Agreement: ` + resData.agreement
	document.querySelector('#values .subjectivity .category-val').innerHTML = `Subjectivity: ` + resData.subjectivity
	document.querySelector('#values .confidence .category-val').innerHTML = `Confidence: ` + resData.confidence
	document.querySelector('#values .irony .category-val').innerHTML = `Irony: ` + resData.irony
}

export { handleSubmit, updateUI }
