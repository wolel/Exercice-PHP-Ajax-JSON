

/**
 * Created by sstienface on 25/01/2019.
 */

function ajaxCall(params)
{
    if(params)
    {

        var url = params.url;
        var parameters = '?';
        for(var i in params.parameters)
        {
            parameters+=Object.keys(params.parameters[i])[0]+"="+params.parameters[i][Object.keys(params.parameters[i])[0]];
        }

        url+=parameters;

        var xhttp = new XMLHttpRequest();

        // Affichage de l'information de chargement

        document.getElementById('ajaxContent').innerHTML = "<div>Chargement en cour ...</div>";

        xhttp.onreadystatechange = function()
        {
            if(this.readyState === 4 && this.status === 200)
            {
                document.getElementById('ajaxContent').innerHTML = "";
                var json = JSON.parse(this.responseText);

                switch(params.parameters[0].action)
                {
                    case"affProducts":

                        for(var i in json)
                        {
                            var div = document.createElement('div');
                            div.innerHTML = "<h1>"+ JSON[i].product_name+"</h1>";
                            div.innerHTML+= "<p>"+ JSON[i].product_description+"</p>";
                            document.getElementById('ajaxContent').appendChild(div);
                        }

                        break;
                    case"affPurchased":
                        //Votre code ici
                        for (var i in json){

                            var div1 = document.createElement('div1');
                            div1.innerHTML = "<h1>"+json[i].product_name+"</h1>";
                            div1.innerHTML = "<h2>"+json[i].buyer_name+"</h2>";
                            document.getElementById('ajaxContent').appendChild(div1);
                        }

                        break;

                    default:
                        alert("Parametre non géré");
                        break;

                }


            }
        };

        xhttp.open("GET",'ajax.php',true);

       //This function will return ok if connection ok and error if not
        xhttp.onload = function(){
            if(xhttp.status >= 200 && xhttp.status < 400){
                console.log('connection ok')
            }else{
                console.log('We\'v connected to the server but it return an error');
                var dataShow = JSON.parse("SELECT product_name, buyer_name FROM `products`,`products_purchased` WHERE 1")
                console.log(dataShow);
            }
        };

        xhttp.send();



        console.log("Sent an http request :"+url);


    }
}

document.getElementById('affProducts').addEventListener('click', function()
{
    ajaxCall(
        {'url' : 'ajax.php',
         'parameters' : [
                {'action' : 'affProducts'}
            ]
        }
    );

});


//Ajouter un event listener pour detecter le click sur le second lien
document.getElementById('affPurchased').addEventListener('click',function(){
    ajaxCall(
        {'url' : 'ajax.php',
        'parameters': [
            {'action' : 'affPurchased'}
            ]
        }
    )
});