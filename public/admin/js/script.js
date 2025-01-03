// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// End Button Status

// Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = event.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Search

// Button Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0) {
  let url = new URL(window.location.href);

  listButtonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// End Button Pagination

// button-change-status
const listButtonChangeStatus = document.querySelectorAll(
  "[button-change-status]"
);
if (listButtonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status]");

  listButtonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const status = button.getAttribute("data-status");
      const path = formChangeStatus.getAttribute("data-path");

      const action = `${path}/${status}/${id}?_method=PATCH`;

      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// End button-change-status

// checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const listInputId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      listInputId.forEach((input) => {
        input.checked = true;
      });
    } else {
      listInputId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  listInputId.forEach((inputId) => {
    inputId.addEventListener("click", () => {
      const countInputIdChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      const lengthInputId = listInputId.length;

      if (countInputIdChecked == lengthInputId) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox-multic

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();

    const type = formChangeMulti.querySelector("select[name='type']").value;
    // const type = event.target.elements.type.value;
    console.log(type);
    const listInputIdChecked = document.querySelectorAll("input[name='id']:checked");
    if (listInputIdChecked.length > 0) {
      const ids = [];

      listInputIdChecked.forEach((input) => {
        const id = input.value;

        if (type == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      const stringIds = ids.join(", ");

      const input = formChangeMulti.querySelector("input[name='ids']");
      input.value = stringIds;

      if (type == "delete-all") {
        const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");
        if (!isConfirm) {
          return;
        }
      }

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi!");
    }
  });
}
// End form-change-multi

// button-delete
const listButtonDelete = document.querySelectorAll("[button-delete]");
if (listButtonDelete.length > 0) {
  const formDeleteItem = document.querySelector("[form-delete-item]");

  listButtonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa?");

      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const path = formDeleteItem.getAttribute("data-path");

        const action = `${path}/${id}?_method=DELETE`;

        formDeleteItem.action = action;

        formDeleteItem.submit();
      }
    });
  });
}
// End button-delete

// show-alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  let time = showAlert.getAttribute("data-time");
  time = parseInt(time);

  // Sau time giây sẽ đóng thông báo
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  // Khi click vào nút close-alert sẽ đóng luôn
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End show-alert

// upload-image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End upload-image

// Sort
const sort = document.querySelector("[sort]") 
if(sort) {
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");

  sortSelect.addEventListener("change", () => {
    const [sortKey, sortValue] = sortSelect.value.split("-");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
  })

  // Xóa sắp xếp
  const sortClear = sort.querySelector("[sort-clear]")
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey", sortKey);
    url.searchParams.delete("sortValue", sortValue);

    window.location.href = url.href;
  })

  // Thêm selected cho option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  
  if(sortKey && sortValue) {
    const string = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(`option[value="${string}"]`);
    optionSelected.setAttribute("selected", true);
  }
}
// End Sort 

// Table permissions
const buttonSubmitPermissions = document.querySelector("[button-submit-permissions]");
if(buttonSubmitPermissions) {
  buttonSubmitPermissions.addEventListener("click", () => {
    const roles = [];
    const tablePermissions = document.querySelector("[table-permissions]");
    const rows = tablePermissions.querySelectorAll("tbody tr[data-name]");

    rows.forEach(row => {
      const dataName = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");

      if(dataName == "id") {
        inputs.forEach(input => {
          const id = input.getAttribute("value");
          roles.push({
            id: id,
            permissions: []
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const inputChecked = input.checked; 
          if(inputChecked) {
            roles[index].permissions.push(dataName);
          }
        });
      }
    })
    if(roles) {
      const formChangePermissions = document.querySelector("[form-change-permissions]")
      const inputRoles = formChangePermissions.querySelector("[name='roles']")
      inputRoles.value = JSON.stringify(roles);
      formChangePermissions.submit();
    }
  })
}
// End Table permissions

// Data default Table Permissions
const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"))
  const tablePermissions = document.querySelector("[table-permissions]")

  records.forEach((record, index) => {
    const permissions = record.permissions;

    permissions.forEach(permission => {
      const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
// End Data default Table Permissions
