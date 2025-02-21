var apiURL = 'api.php';

var countries = {
    //enter countries here; one per row; latest without ","
}

function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = decodeURIComponent(tmparr[1]);
    }
    return params;
}

function performSearch() {
    $('#appletvprompt').css('display', 'none');
    $('#results').html('');
    $('#results').append('<h3>Suchen...</h3>');

    var query = $('#query').val();
    if (!query.length) {
        return false;
    };

    var entity = ($('#entity').val()) ? $('#entity').val() : 'tvSeason';
    var country = ($('#country').val()) ? $('#country').val() : 'us';
    
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: apiURL,
        data: {query: query, entity: entity, country: country, type: 'request'},
        dataType: 'json'
    }).done(function(data) {

        $.ajax({

            type: "GET",
            crossDomain: true,
            url: data.url,
            data: {},
            dataType: 'jsonp'

        }).done(function(data) {

            console.log(data);

            $.ajax({

                type: "POST",
                crossDomain: true,
                url: apiURL,
                data: {json: JSON.stringify(data), type: 'data', entity: entity},
                dataType: 'json'

            }).done(function(data) {

                if (entity == 'tvSeason' || entity == 'movie') {
                    $('#appletvprompt').css('display', 'block');    
                }
                

                $('#results').html('');
                if (data.error) {
                        $('#results').append('<h3>'+data.error+'</h3>');
                } else {
                    if (!data.length) {
                        $('#results').append('<h3>Keine Ergebnisse gefunden.</h3>');
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            var result = data[i];
                            console.log(result.title);

                            var html = '<div><h3>'+result.title+'</h3>';
                            if (entity != 'software' && entity != 'iPadSoftware' && entity != 'macSoftware') {
                                var uncompressed = result.uncompressed ? '<a href="' + result.uncompressed + '" target="_blank">Hohe Auflösung</a>' : '<a href="'+result.hires+'" target="_blank">Hohe Auflösung</a>';
                                html += '<p><a href="'+result.url+'" target="_blank">Standardauflösung</a> | ' + uncompressed + '</p>';
                            } else if (entity == 'software' || entity == 'iPadSoftware') {
                                html += '<p><a href="./app/?url='+encodeURIComponent(result.appstore)+'&country='+country+'" target="_blank">Bildschirmfotos / Videos</a></p>';
                            }
                            html += '<a href="'+result.url+'" target="_blank" title="iTunes Artwork for \''+result.title+'\'" download="'+result.title+'"><img src="'+result.url+'" alt="iTunes Artwork for \''+result.title+'\'" width="'+result.width+'" height="'+result.height+'"></a>';
                            html += '</div>';

                            $('#results').append(html);
                        };
                    }            
                }
                $('#results').append('<p>Wenn das Cover nicht in iTunes verfügbar ist, wird es von diesem Tool nicht gefunden.</p>');

            });
        });
    });
}

$(document).ready(function() {  


    var sortable = [];
    for (var key in countries) {
        sortable.push([key, countries[key]]);   
    }
    sortable.sort(function(a, b) {
        if(a[1] < b[1]) return 1;
        if(a[1] > b[1]) return -1;
        return 0;
    });
    
    for (var i = sortable.length - 1; i >= 0; i--) {
        var array = sortable[i];
        $('#country').append('<option value="'+array[0]+'">'+array[1]+'</option>');
    };

    var params = getSearchParameters();

    if (params.entity) {
        $('#entity').val(params.entity);   
    }

    if (params.query) {
        $('#query').val(params.query);
    }

    if (params.country) {
        $('#country').val(params.country);
    }

    if (params.entity && params.query && params.country) {
        performSearch();
    };

    $('#iTunesSearch').submit(function() {
        performSearch();
        return false;
    });


});
