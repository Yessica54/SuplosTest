
var allData;
var activeTab= 1;
var allSave;

/**
 * Load data from json
 */
loadData = () => {
    fetch('./data-1.json')
    .then(response => response.json())
    .then(realtys => {
        // Do something with your data
        allData = realtys;
        let cuidades = realtys.map(realty => realty.Ciudad);
        let tipos = realtys.map(realty => realty.Tipo);
        loadFilter([...new Set(cuidades)], [...new Set(tipos)]);
        renderData(realtys);
    });
}

/**
 * Render data html
 */
renderData = (realtys, tab) => {
    let template = $.templates("#theTmpl");
    let htmlOutput = template.render(realtys);
    if(tab == 2){
        $("#divResultadosBusquedaSave").html(htmlOutput);
    }else{
        $("#divResultadosBusqueda").html(htmlOutput);
    }
    
}

/**
 * Load Filters
 */
loadFilter = (cuidades, tipos) =>{
    let selectCiudad = document.getElementById('selectCiudad');
    cuidades.forEach(element => {
        let opt = document.createElement('option');
        opt.appendChild( document.createTextNode(element) );
        selectCiudad.appendChild(opt); 
    });

    let selectTipo = document.getElementById('selectTipo');
    tipos.forEach(element => {
        let opt = document.createElement('option');
        opt.appendChild( document.createTextNode(element) );
        selectTipo.appendChild(opt); 
    });
}

/**
 * Search
 */
find = () =>{
    let selectCiudad = document.getElementById('selectCiudad').value;
    let selectTipo = document.getElementById('selectTipo').value;
    let rangoPrecio = document.getElementById('rangoPrecio').value.split(';');

    if(selectCiudad != '' || selectTipo != '' || rangoPrecio != ''){
        let data;
        if(activeTab == 1){
            data = allData;
        }else{
            data = allSave;
        }
        let filtered = data.filter(realty => {
            let precio = parseInt(realty.Precio.replace('$','').replace(',',''), 10);
            if(selectCiudad != '' && selectTipo != ''){
                return realty.Ciudad == selectCiudad && realty.Tipo == selectTipo
            }else if(selectCiudad != ''){
                return realty.Ciudad == selectCiudad
            }else if(selectTipo != ''){
                return realty.Tipo == selectTipo
            }else{
                return precio > rangoPrecio[0] && precio < rangoPrecio[1]
            }
        } );
        renderData(filtered, activeTab);
    }
}

/**
 * Add realty in BD
 */
add = async (id) => {
    let find = allData.filter(bien => bien.Id === id);
    await  fetch('./back/index.php', {
        method: 'POST',
        body: JSON.stringify(find[0]),
    })
    .then(response => response.text())
    .then(realtys => {
        if(realtys == '1'){
            Materialize.toast('Se guardado con exito', 4000);
        }else{
            Materialize.toast('Ya se encuentra guardado', 4000);
        }     
    });
}

/**
 * Change Tab to "Bienes disponibles"
 */
changeTab = ()=>{
    activeTab = 1;
    loadData();
    clearFind();
}

/**
 * Clear filters
 */
clearFind = () =>{
    let selectCiudad = document.getElementById('selectCiudad').value = '';
    let selectTipo = document.getElementById('selectTipo').value = '';
}

/**
 * Load Realty from BD
 */
loadRealtySave = async () =>{
    await  fetch('./back/index.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(realtys => {
       activeTab = 2;
       allSave = realtys;
       renderData(realtys, 2);
       clearFind();
    });
}


loadData();