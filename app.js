$(document).ready(function(){
    $("#submit").click(function(e){
        e.preventDefault();
    
        var input = $("#dob-input").val();
        console.log(typeof(input))
        if (input == "") {
            resetDob();
            location.reload();
        }
        else {
            var dob = new Date(input);
            save(dob);
            renderAgeLoop();
        }
    });

    $("#reset").click(function (e) {
        e.preventDefault();
        resetDob();
        location.reload();
    });

    function save(dob)
    {
        localStorage.dob = dob.getTime();
    };

    function resetDob() {
        localStorage.removeItem("dob");
    }

    function load()
    {
        var dob;
        if (dob = localStorage.getItem("dob"))
        {
            return new Date(parseInt(dob));
        }
        return -1;
    };

    function renderAgeLoop()
    {
        var dob = load();
        $("#choose").css("display", "none");
        $("#timer").css("display", "block");

        setInterval(function(){
            var age = getAge(dob);
            $("#age").html(age.year + "<sup>." + age.ms + "</sup>");

            var alt = Math.pow(10, 9)-age.ms;

            // var percentage = (((76-age.year)+(alt/Math.pow(10,9)))/((age.year)+(age.ms/Math.pow(10,9))))*1000;
            var p = ((((age.year)+(age.ms/Math.pow(10,9)))/77.28)*10).toFixed(2);

            $("#age-label").html("CURRENT AGE " + p);
            if (age.year < 77) {
                $("#time-left").html((76-age.year) + "." + alt + " YEARS LEFT TO LIVE (" + p + "%)");
            }
            else {
                $("time-left").css("display","none");
            }
        }, 100);
    };

    function renderChoose()
    {
        $("#choose").css("display", "block");
    };

    function getAge(dob){
        var now       = new Date;
        var duration  = now - dob;
        var years     = duration / 31556900000;
        
        var majorMinor = years.toFixed(9).toString().split('.');
        
        return {
            "year": majorMinor[0],
            "ms": majorMinor[1]
        };
    };

    function main() {
        if (load() != -1)
        {
            renderAgeLoop();
        } else {
            renderChoose();
        }
    };
    main();
});