function eliminar(id, nroExp) {
   if(confirm("Desea eliminar este registro?")){
    location.href="/eliminar/"+nroExp+"/"+id;
   }
}

$( function() {
  $( document ).ready(function() {
    var ramosEmpresas = [];
    var nombresEmpresas = [];

  $.ajax({
      method: "POST",
      url: "/buscarRamo",  
      success: function(data) {
        var ramos = JSON.parse(data);
        for(var i = 0; i < ramos.length; i++ ) {
          ramosEmpresas.push(ramos[i].ramo)
        }
      }
   });

   $.ajax({
    method: "POST",
    url: "/buscarEmpresas",  
    success: function(data) {
      var empresas = JSON.parse(data);
      for(var i = 0; i < empresas.length; i++ ) {
        nombresEmpresas.push(empresas[i].nombre)
      }
    }
 });

    $( "#tags" ).autocomplete({
      source: ramosEmpresas,
      select: function(event, ui) {   
          location.href="/ver/" + ui.item.value;
      }
    });

    $( "#ramo" ).autocomplete({
      source: ramosEmpresas
    });

    $( "#agregaEmpresa, #buscadorModif" ).autocomplete({
      source: nombresEmpresas
    });

    });
  });

