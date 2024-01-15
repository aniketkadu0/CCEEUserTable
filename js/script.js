function getData() {
  var htmlContent = "";
  $.post({
    url: "https://cceemocktest.online/user/login",
    data: { email: "aniketkadu765@gmail.com", password: "Aniket1996@" },
    success: (data) => {
      var AuthToken = data.authtoken;
      $.get({
        url: "https://red-violet-sockeye-fez.cyclic.app/user/",
        headers: { Authorization: AuthToken },
        success: (data) => {
          var itemsProcessed = 0;
          data.allUsers.forEach((element) => {
            htmlContent += `<tr>
                                <td>${
                                  element.firstName + " " + element.lastName
                                }</td>
                                <td>${element.email}</td>
                                <td>${
                                  element.paymentStatus
                                    ? "true"
                                    : "false" +
                                      `<button id=${element._id} class="btn btn-primary float-end" onclick="update(this.id)">Make true</button>`
                                }</td>
                                <td>${
                                  element.expired
                                    ? "true"
                                    : "false" +
                                      `<button id=${element._id} class="btn btn-primary float-end" onclick="update(this.id)">Make true</button>`
                                }</td>
                                <td>${new Date(
                                  element.createdAt
                                ).toDateString()}</td>
                                <td>${new Date(
                                  element.updatedAt
                                ).toDateString()}</td> 
                            </tr>`;
            itemsProcessed++;
            if (itemsProcessed === data.allUsers.length) {
              callback(htmlContent);
            }
          });
        },
        error: (data) => {
          $("#result").text(data.responseJSON.error);
        },
      });
    },
  });
}

function callback(htmlContent) {
  $("tbody").html(htmlContent);
  $("#example").DataTable({
    // //disable sorting on last column
    // columnDefs: [{ orderable: false, targets: 5 }],
    language: {
      //customize pagination prev and next buttons: use arrows instead of words
      paginate: {
        previous: '<span class="fa fa-chevron-left"></span>',
        next: '<span class="fa fa-chevron-right"></span>',
      },
      //customize number of elements to be displayed
      lengthMenu:
        'Display <select class="form-control input-sm">' +
        '<option value="10">10</option>' +
        '<option value="20">20</option>' +
        '<option value="30">30</option>' +
        '<option value="40">40</option>' +
        '<option value="50">50</option>' +
        '<option value="-1">All</option>' +
        "</select> results",
    },
  });
}

function update(id) {
  $.post({
    url: `https://red-violet-sockeye-fez.cyclic.app/user/paymentstatusupdate/${id}`,
    success: (data) => {
      $("#result").text(data.message);
    },
    error: (data) => {
      console.log(data);
    },
  });
}
