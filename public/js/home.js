$(document).ready(function() {
    $('#join_room_input').select2({
        ajax: {
            url: '/jq_get_rooms',
            dataType: 'json',
            data: function (params) {
                return {
                    room: params.term
                }
            },
            processResults: function (data) {
                console.log(data);
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.name,
                            id: item.name
                        }
                    })
                };
            }
        }
    });
})

function joinRoom() {
    let name = $("#join_room_input").val();
    window.location.href = "/room/" + name;
}

function createRoom() {
    let name = $("#create_room_input").val();
    $.ajax({
        type: "POST",
        url: "/jq_post_room",
        data: {
            name: name
        },
        success: function(msg) {
            window.location.href = "/room/" + name;
        },
        error: function(error) {
            console.log(error);
        }
    });
}

