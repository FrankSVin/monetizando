 var chart;
 var chartRam;
 var chartHD;
 var chartCPU;

 function carregarUsuario() {
  $.ajax({
    cache: false,
    method: "get",
    url: "/login/sessao",
    done: function (data) {
      console.log('sera se aparece o nome dele?');
      $('#spUser').html(data.nomeBanco);
      //$('#spUser').show(data.nomeBanco);
    },
    error: function (e) {
      window.location.href = 'login.html';
    }
  });
}



 function iniciar(){
   carregarRam();
   carregarUsuario();
   //selecionarCaixa();
   carregarhd();
}
 setInterval(iniciar,5000);



 function selecionarCaixa(evt, caixaNr) {
   // Declare all variables
   var i, tabcontent, tablinks;

   // Get all elements with class="tabcontent" and hide them
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
     tabcontent[i].style.display = "none";
   }

   // Get all elements with class="tablinks" and remove the class "active"
   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" active", "");
   }

   // Show the current tab, and add an "active" class to the button that opened the tab
 document.getElementById(caixaNr).style.display = "block";
 evt.currentTarget.className += " active";
 };

 
 

 function carregarRam(){
   console.log('ram ram')
   $.ajax({
     cache: false,
     method: "get",
     url: "/dados/ram",
     done: function (data) {
       //console.log("cade a ram")
       $('#idRam').html(data.ram);
     },
     error: function (e) {
      //console.log("errou");
     }
 });
}

function carregarhd(){
   //console.log('cade o hd?')
   $.ajax({
     cache: false,
     method: "get",
     url: "/dados/hd",
     done: function (data) {
      // console.log("se chegar aqui, pegou hd")
       $('#idHd').html(data.hd);
     },
     error: function (e) {
      //console.log("errou");
     }
 });
}

function carregarComp(){
    //console.log('cade o hd?')
    $.ajax({
      cache: false,
      method: "get",
      url: "/dados/dadosQuase",
      done: function (data) {
       // console.log("se chegar aqui, pegou hd")
        $('#idHd').html(data.hd);
      },
      error: function (e) {
       //console.log("errou");
      }
  });
 }









 google.charts.load('current', {'packages': ['line']});
	var materialOptionsHD = {
		chart: {
			title: 'HD'
		},
		width: 600,
		height: 400,
		series: {
			0: {
				axis: 'hd',
				color: '#FF0000'
			},
		},
		axes: {
			y: {
				hd: {
					label: 'HD'
				},
			}
		}
	};

		var materialOptionsRam = {
		chart: {
			title: 'RAM'
		},
		width: 600,
		height: 400,
		series: {
			0: {
				axis: 'ram',
				color: '#00FF00'
			},
		},
		axes: {
			y: {
				ram: {
					label: 'RAM'
				},
			}
		}
  };

  var materialOptionsCPU = {
		chart: {
			title: 'CPU'
		},
		width: 600,
		height: 400,
		series: {
			0: {
				axis: 'cpu',
				color: '#0000FF'
			},
		},
		axes: {
			y: {
				cpu: {
					label: 'CPU'
				},
			}
		}
  };
  
	google.charts.setOnLoadCallback(() => {
		chartRam = new google.charts.Line(document.getElementById('div_graficoRam'));
    chartHD = new google.charts.Line(document.getElementById('div_graficoHD'));
    chartCPU = new google.charts.Line(document.getElementById('div_graficoCPU'));
    
		//carregarDadosGrafico();
    setInterval(carregarDadosCpu, 5000);
    setInterval(carregarDadosHD, 5000);
    setInterval(carregarDadosRam, 5000);
	});
	function drawChartRam(dadosRam) {
		
		var dataRam = new google.visualization.DataTable();
		dataRam.addColumn('string', 'Hora');
		dataRam.addColumn('number', 'Ram');
    
		var dia;
		var hora;
		var tempo;

		for(var i = 9; i >= 0; i--){
			dia = dadosRam[i].DATA_CADASTRO.split('T');
			hora = dia[1].split('.');
			tempo = `${hora[0]}`;
			
			
			dataRam.addRows([ 
				[tempo, dadosRam[i].PORCENTAGEM_USO]
			]);
		}
				
		chartRam.draw(dataRam, materialOptionsRam);

  }
  
  function drawChartHD(dadosHd){
    var dataHD = new google.visualization.DataTable();
		dataHD.addColumn('string', 'Hora');
    dataHD.addColumn('number', 'HD');
    
    var dia;
		var hora;
    var tempo;
    
    for(var i = 9; i >= 0; i--){
			dia = dadosHd[i].DATA_CADASTRO.split('T');
			hora = dia[1].split('.');
			tempo = `${hora[0]}`;
      
      dataHD.addRows([
				[tempo, dadosHd[i].PORCETAGEM_USO]
      ])
    }

    chartHD.draw(dataHD, materialOptionsHD);
    
  }

  function drawChartCPU(dadosCpu){
    var dataCpu= new google.visualization.DataTable();
		dataCpu.addColumn('string', 'Hora');
    dataCpu.addColumn('number', 'CPU');

    var dia;
		var hora;
    var tempo;
    
    for(var i = 9; i >= 0; i--){
			dia = dadosCpu[i].DATA_CADASTRO.split('T');
			hora = dia[1].split('.');
			tempo = `${hora[0]}`;
      
      dataCpu.addRows([
				[tempo, dadosCpu[i].PORCENTAGEM_USO]
			])
    }

    chartCPU.draw(dataCpu, materialOptionsCPU);
    
  }

	function carregarDadosCpu() {
		$.ajax({
			cache: false,
			method: "get",
			url: `/dados/ultimasCPU`,
			success: function (datacpu) {
			
				drawChartCPU(datacpu);
				
			},
			error: function (e) {
				//console.log("Erro:", e);
			}
		});
  }

  function carregarDadosHD() {
		$.ajax({
			cache: false,
			method: "get",
			url: `/dados/ultimasHD`,
			success: function (datahd) {
		
				drawChartHD(datahd);
				
			},
			error: function (e) {
				//console.log("Erro:", e);
			}
		});
  }

  function carregarDadosRam() {
		$.ajax({
			cache: false,
			method: "get",
			url: `/dados/ultimasRam`,
			success: function (dataram) {
	
				drawChartRam(dataram);
				
			},
			error: function (e) {
				//console.log("Erro:", e);
			}
		});
  }