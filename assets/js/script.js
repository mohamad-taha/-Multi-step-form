const steps = document.querySelectorAll(".step > span");
const stepsForm = document.querySelectorAll("#stepsForm > div");
const nextStepBtn = document.querySelector("button[type='submit']");
const backStepBtn = document.querySelector("#backBtn");
const planLabels = document.querySelectorAll(".plan");

const planHeader = document.querySelector(".plan-header h2 span:first-child");
const planPay = document.querySelector(".plan-header h2 span:last-child");
const planSelect = document.querySelectorAll("[name=plan]");

const billingToggle = document.getElementById("billingToggle");
const billingOptionMonthly = document.getElementById("billingOptionMonthly");
const billingOptionYearly = document.getElementById("billingOptionYearly");
const planPrices = document.querySelectorAll(".plan span");
const planPrice = document.querySelector(".plan-price");
const addonDetails = document.querySelector(".addon-details");
const totalLabel = document.querySelector(".total-details > p:first-child");
const totalPrice = document.querySelector(".total-price");
const selectedServices = document.querySelectorAll("[name=addon]");

let currentStep = 1;

initializeSteps();

nextStepBtn.addEventListener("click", handleNextStep);
backStepBtn.addEventListener("click", handleBackStep);

planLabels.forEach((label) => {
  label.addEventListener("click", handlePlanLabelClick);
});

function initializeSteps() {
  resetStepsAndForms();
  updateStep(currentStep);
}

let form1 = document.querySelector(`#formStep1`);
let form2 = document.querySelector(`#formStep2`);
let form3 = document.querySelector(`#formStep3`);
let form4 = document.querySelector(`#formStep4`);

let inputsForm1 = document.querySelectorAll(`#formStep1 input`);
let inputsForm3 = document.querySelectorAll(`#formStep3 input`);
let inputsForm4 = document.querySelectorAll(`#formStep4 input`);

function handleNextStep(e) {
  e.preventDefault();

  const isForm1Invalid = Array.from(inputsForm1).every(
    (input) => input.value !== ""
  );

  if (form1.style.display === "flex" && !isForm1Invalid) {
    alert(
      `Please fill out all fields in step ${currentStep} before proceeding.`
    );
    return;
  }

  if (form2.style.display === "flex") {
    const selectedPlan = Array.from(planSelect).find((input) => input.checked);
    if (!selectedPlan) {
      alert(`Please select a plan in step ${currentStep} before proceeding.`);
      return;
    }
  }
  if (form3.style.display === "flex") {
    const selectedService = Array.from(selectedServices).filter(
      (input) => input.checked
    );
    if (selectedService.length === 0) {
      alert(`Please select an addon in step ${currentStep} before proceeding.`);
      return;
    }
  }

  if (currentStep < steps.length) {
    resetStepsAndForms();
    currentStep++;
    console.log(currentStep);

    updateStep(currentStep);
  }
}

function handleBackStep(e) {
  e.preventDefault();
  if (currentStep > 1) {
    resetStepsAndForms();
    currentStep--;
    updateStep(currentStep);
  }
}

function handlePlanLabelClick() {
  resetPlanLabels();
  this.style.borderColor = "#716baf";
  this.style.background = "#f8f9fe";
}

function resetStepsAndForms() {
  resetSteps();
  resetForms();
}

function resetSteps() {
  steps.forEach((step) => {
    step.style.background = "";
    step.style.color = "";
    step.style.borderColor = "";
  });
}

function resetForms() {
  stepsForm.forEach((form) => {
    form.style.display = "none";
  });
}

function updateStep(stepIndex) {
  if (stepIndex > 0 && stepIndex <= steps.length) {
    const currentStepElement = steps[stepIndex - 1];
    currentStepElement.style.background = "#bce1fd";
    currentStepElement.style.color = "black";
    currentStepElement.style.borderColor = "#bce1fd";

    const currentForm = stepsForm[stepIndex - 1];
    if (currentForm) currentForm.style.display = "flex";

    if (stepIndex === 1) {
      backStepBtn.style.opacity = "0";
      backStepBtn.style.zIndex = "-10";
    } else {
      backStepBtn.style.opacity = "1";
      backStepBtn.style.zIndex = "";
    }

    if (stepIndex === steps.length - 1) {
      nextStepBtn.textContent = "Confirm";
      nextStepBtn.style.background = "#483eff";
    } else {
      nextStepBtn.textContent = "Next Step";
      nextStepBtn.style.background = "#03295a";
    }

    if (stepIndex === steps.length) {
      nextStepBtn.style.opacity = "0";
      nextStepBtn.style.zIndex = "-10";
    } else {
      nextStepBtn.style.opacity = "1";
      nextStepBtn.style.zIndex = "0";
    }
  }
}

function resetPlanLabels() {
  planLabels.forEach((label) => {
    label.style.borderColor = "";
    label.style.background = "";
  });
}

const monthlyPrices = ["9", "12", "15"];
const yearlyPrices = ["90", "120", "150"];

const addonsPrices = {
  monthly: {
    onlineService: 1,
    largerStorage: 2,
    customizableProfile: 2,
  },
  yearly: {
    onlineService: 10,
    largerStorage: 20,
    customizableProfile: 20,
  },
};

planSelect.forEach((select) => {
  select.addEventListener("change", () => {
    const selectedPlanIndex = Array.from(planSelect).indexOf(select);
    const isYearly = billingToggle.checked;
    const prices = isYearly ? yearlyPrices : monthlyPrices;

    planHeader.innerHTML =
      select.value + (isYearly ? " (Yearly)" : " (Monthly)");
    planPrice.innerHTML = `$<span>${prices[selectedPlanIndex]}</span><span>/${
      isYearly ? "yr" : "mo"
    }</span>`;
    handelTotalPrice();
  });
});

function updatePlanPrices() {
  const isYearly = billingToggle.checked;
  const prices = isYearly ? yearlyPrices : monthlyPrices;

  planPrices.forEach((span, index) => {
    span.innerHTML = `$<span>${prices[index]}</span><span>/${
      isYearly ? "yr" : "mo"
    }</span>`;
  });

  if (isYearly) {
    billingOptionMonthly.style.color = "#ccc";
    billingOptionYearly.style.color = "#000";
    totalLabel.innerHTML = "per (year)";
  } else {
    billingOptionMonthly.style.color = "#000";
    billingOptionYearly.style.color = "#ccc";
    totalLabel.innerHTML = "per (month)";
  }
}

function updateAddonPrices() {
  const isYearly = billingToggle.checked;
  const pricingType = isYearly ? "yearly" : "monthly";

  document.querySelector("#onlineServicePrice").textContent = `+$${
    addonsPrices[pricingType].onlineService
  }/${isYearly ? "yr" : "mo"}`;

  document.querySelector("#largerStoragePrice").textContent = `+$${
    addonsPrices[pricingType].largerStorage
  }/${isYearly ? "yr" : "mo"}`;

  document.querySelector("#customizableProfilePrice").textContent = `+$${
    addonsPrices[pricingType].customizableProfile
  }/${isYearly ? "yr" : "mo"}`;
}

billingToggle.addEventListener("change", () => {
  updatePlanPrices();
  updateAddonPrices();
  selectedServices.forEach((select) => {
    select.checked = "";
  });
  const selectedPlanIndex = Array.from(planSelect).findIndex(
    (input) => input.checked
  );
  if (selectedPlanIndex !== -1) {
    const prices = billingToggle.checked ? yearlyPrices : monthlyPrices;

    planHeader.innerHTML =
      planSelect[selectedPlanIndex].value +
      (billingToggle.checked ? " (Yearly)" : " (Monthly)");
    planPrice.innerHTML = `<span>${prices[selectedPlanIndex]}</span><span>/${
      billingToggle.checked ? "yr" : "mo"
    }</span>`;
  }
  handelTotalPrice();
});

updatePlanPrices();
updateAddonPrices();

let services = [];

selectedServices.forEach((input) => {
  input.addEventListener("change", updateSelectedServices);
});

function updateSelectedServices() {
  const filteredInputs = Array.from(selectedServices).filter(
    (input) => input.checked
  );
  services = filteredInputs.map((input) => input.value);

  const isYearly = billingToggle.checked;
  const pricingType = isYearly ? "yearly" : "monthly";
  const priceSuffix = isYearly ? "/yr" : "/mo";

  addonDetails.innerHTML = services
    .map((service) => {
      const price = addonsPrices[pricingType][service];
      return `
      <div>
        <p>${service}</p>
        <p>+<span class=addonPrice>${price}</span>${priceSuffix}</p>
      </div>
    `;
    })
    .join("");
  handelTotalPrice();
}

const handelTotalPrice = () => {
  if (document.querySelector(".addonPrice")) {
    const addonPrice = document.querySelectorAll(".addonPrice");
    const finalPlanPrice = document.querySelector(
      ".plan-price span:first-child"
    );

    const totalCoast = Array.from(addonPrice).reduce(
      (acc, span) => +acc + +span.innerHTML,
      0
    );

    totalPrice.innerHTML = `+$<span>${
      +totalCoast + +finalPlanPrice.innerHTML
    }</span>/${billingToggle.checked ? "yr" : "mo"}`;
  }
};

handelTotalPrice();
