function processAndVisualizeData(data) {
    const url = 'http://127.0.0.1:5000/vaccinated_people_province';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        processAndVisualizeData(data);
      })
      .catch(error => {
        console.log('Error loading data:', error);
      });
    var provinces = [];
    var vaccinatedPeople = [];
    data.forEach(document => {
      var vaccinated = document["cumm_vaccinated_people"];
      var province = document["_id"];
      console.log("Vaccinated People:", vaccinated);
      console.log("Province:", province);
      provinces.push(province);
      vaccinatedPeople.push(vaccinated);
    });
    const updatedTrace = {
      x: provinces,
      y: vaccinatedPeople,
      type: 'bar',
      orientation: 'v',
      width: 0.8,
    };
    const updatedData = [updatedTrace];
    const updatedLayout = {
      title: 'Vaccinated People by Province',
      xaxis: {
        title: 'Province',
      },
      yaxis: {
        title: 'Vaccinated People',
        automargin: true,
        title_standoff: 50,
      },
    };
    Plotly.newPlot('plot', updatedData, updatedLayout);
  }
  