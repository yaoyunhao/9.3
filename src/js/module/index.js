$(function() {
    $('#ipt').on("input", function() {
        var val = $(this).val();
        $.ajax({
            url: "/api/list?key=" + val,
            dataType: "json",
            success: function(data) {
                var str = "";
                data.forEach(function(file) {
                    str += "<li>" + file.title + "</li>"
                })
                $(".list").html(str);
            }
        })
    })
})