document.addEventListener('DOMContentLoaded', function () {
  loadSavedData();
  document.getElementById('nextStep1').addEventListener('click', handleStep1);
  document.getElementById('nextStep2').addEventListener('click', handleStep2);
  document.getElementById('reset').addEventListener('click', reset);
});

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function isValidCEP(cep) {
  const regex = /^[0-9]{5}-?[0-9]{3}$/;
  return regex.test(cep);
}

function handleStep1() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const cep = document.getElementById('cep').value;
  const consent = document.getElementById('consent').checked;
  const errorDiv = document.getElementById('errorStep1');

  if (!name.trim()) {
    errorDiv.textContent = 'Por favor, insira o nome.';
    return;
  }

  if (!isValidEmail(email)) {
    errorDiv.textContent = 'Por favor, insira um e-mail válido.';
    return;
  }

  if (!isValidCEP(cep)) {
    errorDiv.textContent = 'Por favor, insira um CEP válido.';
    return;
  }

  localStorage.setItem('churrascoData', JSON.stringify({ name, email, cep, consent }));
  errorDiv.textContent = '';
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
}

function handleStep2() {
  const numMen = parseInt(document.getElementById('numMen').value) || 0;
  const numWomen = parseInt(document.getElementById('numWomen').value) || 0;
  const numChildren = parseInt(document.getElementById('numChildren').value) || 0;
  const numDrinkers = parseInt(document.getElementById('numDrinkers').value) || 0;

  const results = calculateChurrasco(numMen, numWomen, numChildren, numDrinkers);
  displayResults(results);

  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'block';
}

function calculateChurrasco(numMen, numWomen, numChildren, numDrinkers) {
  const totalAdults = numMen + numWomen;
  return {
    carne: (numMen * 0.4) + (numWomen * 0.32) + (numChildren * 0.2),
    paoDeAlho: (totalAdults * 2) + (numChildren * 1),
    carvao: totalAdults + numChildren,
    sal: (totalAdults + numChildren) * 0.04,
    gelo: Math.ceil((totalAdults + numChildren) / 10) * 5,
    refrigerante: Math.ceil((totalAdults + numChildren) / 5) * 2,
    agua: Math.ceil((totalAdults + numChildren) / 5),
    cerveja: numDrinkers * 3
  };
}

function displayResults(results) {
  const table = document.getElementById('resultTable');
  table.innerHTML = `
      <tr><th>Item</th><th>Quantidade</th></tr>
      <tr><td>Carne (Kg)</td><td>${results.carne.toFixed(2)}</td></tr>
      <tr><td>Pão de Alho</td><td>${results.paoDeAlho}</td></tr>
      <tr><td>Carvão (Kg)</td><td>${results.carvao}</td></tr>
      <tr><td>Sal (Kg)</td><td>${results.sal.toFixed(2)}</td></tr>
      <tr><td>Gelo (Kg)</td><td>${results.gelo}</td></tr>
      <tr><td>Refrigerante (L)</td><td>${results.refrigerante}</td></tr>
      <tr><td>Água (L)</td><td>${results.agua}</td></tr>
      <tr><td>Cerveja (Garrafas)</td><td>${results.cerveja}</td></tr>
  `;
}

function reset() {
  localStorage.removeItem('churrascoData');
  document.location.reload();
}

function loadSavedData() {
  const savedData = JSON.parse(localStorage.getItem('churrascoData'));
  if (savedData) {
    document.getElementById('name').value = savedData.name;
    document.getElementById('email').value = savedData.email;
    document.getElementById('cep').value = savedData.cep;
    document.getElementById('consent').checked = savedData.consent;

    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
  }
}