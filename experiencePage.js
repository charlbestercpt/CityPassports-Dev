<style>

.spinner {
  position: relative;
}

.spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: #333;
  animation: spin 1s linear infinite;
}
.button_availability {
  height: auto;
  width: 100%;
  min-height: 3rem; 
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>

<script>
  const priceData = {
  adultPrice: localStorage.getItem('ADULT_Price'),
  seniorPrice: localStorage.getItem('SENIOR_Price'),
  youthPrice: localStorage.getItem('YOUTH_Price'),
  childPrice: localStorage.getItem('CHILD_Price'),
  infantPrice: localStorage.getItem('INFANT_Price'),
  travelerPrice: localStorage.getItem('TRAVELLER_Price')
};
const filteredPriceData = {};
for (const key in priceData) {
  const value = priceData[key];
  if (value !== null && value !== undefined && value !== "") {
    filteredPriceData[key] = value;
  }
}

if (Object.keys(filteredPriceData).length !== 0) {
  localStorage.setItem('priceData', JSON.stringify(filteredPriceData));
  console.log(filteredPriceData);
}
 const discountData = {
    adultDiscType: localStorage.getItem('ADULT_Disc_Type'),
    seniorDiscType: localStorage.getItem('SENIOR_Disc_Type'),
    youthDiscType: localStorage.getItem('YOUTH_Disc_Type'),
    childDiscType: localStorage.getItem('CHILD_Disc_Type'),
    infantDiscType: localStorage.getItem('INFANT_Disc_Type'),
    travelerDiscType: localStorage.getItem('TRAVELLER_Disc_Type')
  };
const filteredDiscountData = {};
  for (const key in discountData) {
    if (discountData[key] !== null && discountData[key] !== undefined) {
      filteredDiscountData[key] = discountData[key];
    }
  }
  
if (Object.keys(filteredDiscountData).length > 0) {
  localStorage.setItem('discountData', JSON.stringify(filteredDiscountData));
  console.log(filteredDiscountData);
}
const discountValue = {
    adultDiscValue: localStorage.getItem('ADULT_Disc_Value'),
    seniorDiscValue: localStorage.getItem('SENIOR_Disc_Value'),
    youthDiscValue: localStorage.getItem('YOUTH_Disc_Value'),
    childDiscValue: localStorage.getItem('CHILD_Disc_Value'),
    infantDiscValue: localStorage.getItem('INFANT_Disc_Value'),
    travelerDiscValue: localStorage.getItem('TRAVELLER_Disc_Value')
  };

  const filteredDiscountValue = {};
  for (const key in discountValue) {
    if (discountValue[key] !== null && discountValue[key] !== undefined) {
      filteredDiscountValue[key] = discountValue[key];
    }
  }

  if (Object.keys(filteredDiscountValue).length > 0) {
  localStorage.setItem('discountValue', JSON.stringify(filteredDiscountValue));
  console.log(filteredDiscountValue);
}  
</script>

<script>

document.addEventListener('DOMContentLoaded', function() {

const xeroSupplierId = '{{wf {&quot;path&quot;:&quot;netsuite-supplier-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}';
  if (xeroSupplierId) {
    localStorage.setItem('xeroSupplierId', xeroSupplierId);
  } else {
    console.error('Error: Suplier ID not available');
  }
  
  const pickup_locations = '{{wf {&quot;path&quot;:&quot;pick-up-locations-2&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}';
    if (pickup_locations !== "Not Applicable" && pickup_locations !== null && pickup_locations !== '') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(pickup_locations, 'text/html');
      const decodedJsonStr = doc.documentElement.textContent;
     const decodedJson = JSON.parse(decodedJsonStr);
     console.log(decodedJson);
     localStorage.setItem('pickup_locationsObj', JSON.stringify(decodedJson));
} else {
  console.error('NOTE: Pick Up Not Applicable');
}
});
async function checkAvailability(){

  const experience_image = '{{wf {&quot;path&quot;:&quot;experience-image&quot;,&quot;type&quot;:&quot;ImageRef&quot;\} }}';
  const key = 'experienceImage';
  localStorage.setItem(key, experience_image);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
};

// Viator Product Call
fetch("https://hook.us1.make.com/g6t9pxvv5h7hf7a9ftb7qcl975caz54x?product_code={{wf {&quot;path&quot;:&quot;viator-product-code&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}", requestOptions)
  .then(response => response.text())
  .then(result => {
		console.log(result)
		localStorage.setItem('booking_questions',result);
    console.log("Updated local storage")
  })
  .catch(error => console.log('error', error));

fetch("https://hook.us1.make.com/6to1i7agoi3k956b5pde9flbgzbrms3b/?product_code={{wf {&quot;path&quot;:&quot;viator-product-code&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result);
    localStorage.setItem("data", result);

    // Parse the result to a JSON object
    var resultObj = JSON.parse(result);

    // Check if the code is NOT_FOUND
    if (resultObj.code === "NOT_FOUND") {
      // Set the display of the element with id 'notActive' to flex
      document.getElementById('notActive').style.display = 'flex';

      // Stop further execution
      return;
    }

const storedData = localStorage.getItem("data");
let data = JSON.parse(storedData);

const storedDiscountValue = localStorage.getItem("discountValue");
const discountValue = JSON.parse(storedDiscountValue);

const ageBands = ["ADULT", "SENIOR", "CHILD", "YOUTH", "INFANT", "TRAVELER"];

const isAdultDiscountType = localStorage.getItem("ADULT_Disc_Type");

if (isAdultDiscountType === "true" && discountValue) {
  ageBands.forEach((ageBand) => {
    const discountKey = `${ageBand.toLowerCase()}DiscValue`;
    const discountPercentage = parseFloat(discountValue[discountKey]);

    if (discountPercentage) {
      data.bookableItems.forEach((product) => {
        product.seasons.forEach((season) => {
          season.pricingRecords.forEach((record) => {
            record.pricingDetails.forEach((detail) => {
              if (detail.ageBand === ageBand) {
                detail.price.original.recommendedRetailPrice -=
                  (detail.price.original.recommendedRetailPrice *
                    discountPercentage) /
                  100;

                // Ensure two decimal places for all numbers
                detail.price.original.recommendedRetailPrice = parseFloat(detail.price.original.recommendedRetailPrice.toFixed(2));
              }
            });
          });
        });
      });
    }
  });
} else if (isAdultDiscountType === "false") {
  // Additional logic for when ADULT_Disc_Type is false
  ageBands.forEach((ageBand) => {
    const discountKey = `${ageBand.toLowerCase()}DiscValue`;
    const discountValueSet = parseFloat(discountValue[discountKey]);

    if (!isNaN(discountValueSet)) {
      data.bookableItems.forEach((product) => {
        product.seasons.forEach((season) => {
          season.pricingRecords.forEach((record) => {
            record.pricingDetails.forEach((detail) => {
              if (detail.ageBand === ageBand) {
                detail.price.original.recommendedRetailPrice -= discountValueSet;

                // Ensure two decimal places for all numbers
                detail.price.original.recommendedRetailPrice = parseFloat(detail.price.original.recommendedRetailPrice.toFixed(2));
              }
            });
          });
        });
      });
    }
  });
}

localStorage.setItem('data', JSON.stringify(data));

// Get the CMS field value
const cmsFieldValue = '{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}'; 

// Decode the HTML entities before saving to local storage
const decodedValue = document.createElement('textarea');
decodedValue.innerHTML = cmsFieldValue;
const decodedText = decodedValue.value;

// Save the decoded value to local storage
localStorage.setItem('name', decodedText);
localStorage.setItem('xeroItemId','{{wf {&quot;path&quot;:&quot;netsuite-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}');
localStorage.setItem('airtableId','{{wf {&quot;path&quot;:&quot;airtable-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}');
console.log("Updated local storage");

var button = document.querySelector('.button_availability');
  button.classList.add('spinner');
  
  // make your AJAX request here, and when you get a response, remove the spinner class:
  setTimeout(function() {
    button.classList.remove('spinner');
    window.location.href = '/app/availability-schedule';
    
    
  }, 5000);
    
  })
  .catch(error => console.log('error', error));


}


</script>


<button class="button_availability" onclick="checkAvailability()" data-text="Check Availability">Check Availability
</button>