  let formOption = 'optionsMetric';

  let outputData = {
    height: 0,
    idealWeight: 0,
    lowVT: 0,
    highVT: 0,
    gender: '',
  };

  const clear = () => {
    $('input[type=text]').val('');
  };

  const feetToCm = (feet, inches) => {
    let height = 2.54 * ((feet * 12) + inches);
    // console.log(height);
    return Math.round(height * 10) / 10;
  };

  const kgBMIToCm = (kg, BMI) => {
    let height = 100 * Math.sqrt(kg/BMI);
    return Math.round(height * 10) / 10;
  };

  const allCalcs = (height, gender) => {
    outputData.height = height;
    outputData.idealWeight = idealWt(height, gender);
    outputData.lowVT = 10 * Math.round(outputData.idealWeight * 0.6);
    outputData.highVT = 10 * Math.round(outputData.idealWeight * 0.8);
    if (gender==='m') {
      outputData.gender="Male";
    } else {
      outputData.gender="Female";
    };
  };

  const idealWt = (height, gender) => {
    let ibm = 0;
    if (gender === 'm') {
      ibm = 50.0 + 0.91 * (height - 152.4);
    } else {
      ibm = 45.5 + 0.91 * (height - 152.4);
    }
    return Math.round(ibm * 10) / 10;
  };

  const kgCmToBMI = (kg, cm) => {
    let bmi = kg/(cm/100)^2;
    return Math.round(ibm * 10) / 10;
  };

  const displayResults = (results) => {
    // console.log(results);
    $('#outputGender').html(results.gender);
    $('#outputHeight').html(results.height);
    $('#outputWeight').html(results.idealWeight);
    $('#outputLowVT').html(results.lowVT);
    $('#outputHighVT').html(results.highVT);
  };

  $( document ).ready(()  => {
    $('#imperialHeight, #calcHeight').hide();
    $('#metricHeight').show();
    $('#mainContent').hide();
    $('#results').hide();
    clear();
  });

  $('#goContinue').click((e) => {
    e.preventDefault();
    $('#disclaimer').hide();
    $('#mainContent').show();
  });

  $('.inputOption').change((e) => {
    e.preventDefault();
    clear(); //clear all text boxes
    $('#results').hide();
    formOption = e.target.id;
    switch(formOption) {
      case 'optionsMetric':
        $('#imperialHeight, #calcHeight').hide();
        $('#metricHeight').show();
        break;
      case 'optionsImperial':
        $('#metricHeight, #calcHeight').hide();
        $('#imperialHeight').show();
        break;
      case 'optionsCalc':
        $('#metricHeight, #imperialHeight').hide();
        $('#calcHeight').show();
        break;
      };
  });

  $('#goCalculate').click((e) => {
    e.preventDefault();
    let height = 0;
    let valid = true;
    let errorMessage = '';
    let gender = $('input:radio[name="inputGender"]:checked').val();
    if (gender===undefined) {
      valid = false;
      errorMessage = 'Gender not selected';
    };
    switch(formOption) {
      case 'optionsMetric':
        height = parseFloat($('#inputCm').val());
        if (isNaN(height)) {
          valid=false;
          errorMessage='You must enter a number of cm';
        }
        break;
      case 'optionsImperial':
        // some validation
        height = feetToCm(
          parseInt($('#inputFeet').val()),
          parseFloat($('#inputInches').val())
        );
        if (isNaN(height)) {
          valid=false;
          errorMessage='You have not entered valid values for feet and inches';
        }
        break;
      case 'optionsCalc':
        height = kgBMIToCm(
          parseFloat($('#inputWeight').val()),
          parseInt($('#inputBMI').val())
        );
        console.log(height);
        if (isNaN(height)) {
          valid= false;
          errorMessage='You must enter numbers for weight and BMI'
        }
        break;
    };
    if (height<153 || height>220) {
      valid= false;
      errorMessage = 'Height outside accepted range'
    };
    if (valid) {
      allCalcs(height, gender);
      displayResults(outputData);
      $('body, html').animate({scrollTop: $("#results").offset().top}, 600);
      $('#mainContent').hide();
      $('#results').show();
    } else {
      $('#results').hide();
      alert(errorMessage);
    };
  });

  $('#goNewPatient').click((e) => {
    e.preventDefault();
    formOption = 'optionsMetric';
    clear();
    $('input:radio[name=inputGender]:checked').prop('checked', false);
    $('input:radio[name=heightOption]:checked').prop('checked', false);
    $('#optionsMetric').prop('checked', true);
    $('#imperialHeight, #calcHeight').hide();
    $('#metricHeight').show();
    $('#results').hide();
    $('#mainContent').show();
  });
