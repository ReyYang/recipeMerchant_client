$(function () {
    var Classify = [{
            "marque": "重量",
            "model": [{
                    "name": "1"
                },
                {
                    "name": "0"
                }
            ]
        },
        {
            "marque": "尺寸",
            "model": [{
                    "name": "1"
                },
                {
                    "name": "0"
                }
            ]
        },
        {
            "marque": "材质",
            "model": [{
                    "name": "1"
                },
                {
                    "name": "0"
                }
            ]
        }
    ];
    var data1 = new Array();

    function getJSON(data, index, fn) {
        if (index == Classify.length) {
            fn(data1);
        } else {
            data.children = {};
            data.children = Classify[index];
            index++;
            getJSON(data.children, index, fn);
        }
    }

    var table_data = [];

    function eachJSON(arr, index, fn) {
        if(arr.children == undefined){
            fn(table_data)
        }else{
            var key = data1.marque+":";
        }
    }


    $(document).on('click', '#testJSON', function () {
        data1 = Classify[0];
        getJSON(data1, 1, (res) => {
            data1 = res;
        });
        var json = JSON.stringify(data1);
        console.log(data1.children.children);
    });
});