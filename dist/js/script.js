$(document).ready(function () {

    /**
     * FONCTION LOAD METEO
     */
    function loadmeteo(url){
        $.ajax({
            url: url,

            type: 'GET',

            data: '',

            dataType: 'json',

            success: function(array){

                // CURRENT TIME
                const element = document.getElementById("currentTime")

                setInterval(function(){
                    const currentDate = new Date()
                    element.innerText = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
                }, 1000)

                // TODAY
                $("#city").html(array.city_info.name)
                $("#date").html(array.current_condition.date)
                $("#temp").html(array.current_condition.tmp + '°')
                $(".ico").css("background-image", "url(./img/temps/" + array.current_condition.condition_key +".png)")
                $("#condition").html(array.current_condition.condition)
                $("#maxT").html(array.fcst_day_0.tmax + '°')
                $("#minT").html(array.fcst_day_0.tmin + '°')

                // WEEK
                var i = ''
                var html = ''

                $(".days-cont").html(html)

                for (i = 1; i < 5; i++){
                    $(".days-cont").append('<div id="day"><h2>' + array['fcst_day_'+i].day_short +'</h2><h3>' + array['fcst_day_'+i].date + '</h3></div><div class="maxima"><div class="maxima-cont"><img src="./img/icons/hot.png" alt=""><h3>' + array['fcst_day_'+i].tmax +'°</h3><span><img src="./img/ligne3.png" alt=""></span><h3>' + array['fcst_day_'+i].tmin+'°</h3><img src="./img/icons/cold.png" alt=""></div><div class="maxima-img"><img src="./img/temps/' + array['fcst_day_'+i].condition_key +'.png" alt=""></div></div>')
                }
            } // success
        }) // ajax
    }

    /**
     * BOUTON
     */
    $(".btn").click(function(){
        const ville = $("#ville").val()
        loadmeteo("https://www.prevision-meteo.ch/services/json/"+ville)
    })

    /**
     * POSITION
     */
        var myInput = document.getElementById("ville");
        myInput.oninput = function () {
            var ville = $('#ville').val();
            loadmeteo('https://www.prevision-meteo.ch/services/json/' + ville, "search");
        }
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                const lat = position.coords.latitude
                const lng = position.coords.longitude
    
                // LOAD METEO
                loadmeteo("https://www.prevision-meteo.ch/services/json/lat=" + lat + "lng=" + lng)
    
                // AJAX
                $.ajax({
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&result_type=locality&key=AIzaSyCKcTQ-zk45bUB2U-0mIhYELU1CKbrSFTI',
    
                    type: 'GET',
    
                    data: {},
    
                    dataType: 'json',
    
                    success: function(data){
                        const array = data.results
    
                        setTimeout(() => {
                            $("#city").html(data.results[0].address_components[0].long_name);
                        }, "500")
    
                    } // success
                }) // ajax
            }) // condition
        } else {
            console.log("Browser doesn't support geolocalisation !");
        }
})