
    $(document).ready(function () {
      $('[data-toggle="popover"]').popover({
        html: true,
      });
    });
  
    function addToSpecificList() {
      var input = document.getElementById('itemInput').value;
      var itemType = document.querySelector('input[name="itemType"]:checked');
  
      if (!input) {
        alert('Please enter a fruit or legume before adding to the specific list.');
        return;
      }
  
      if (!itemType) {
        alert('Please select either "Fruit" or "Legume" before adding to the specific list.');
        return;
      }
  
      var listContainer = document.getElementById(itemType.value + 'sList');
      var listItem = document.createElement('li');
      listItem.textContent =
        itemType.value.charAt(0).toUpperCase() + itemType.value.slice(1) + '! - ' + input;
      listContainer.appendChild(listItem);
  
      // Clear input and radio buttons after adding
      document.getElementById('itemInput').value = '';
      itemType.checked = false;
  
      // Set the color based on the item type
      listItem.classList.add(itemType.value);
    }
  
    function addToGeneralList() {
  var input = document.getElementById('itemInput').value;
  var itemType = document.querySelector('input[name="itemType"]:checked');

  if (!input) {
    alert('Please enter a fruit or legume before adding to the general list.');
    return;
  }

  var listContainer = document.getElementById('fruitsAndLegumesList');
  var listItem = document.createElement('li');

  if (itemType && itemType.value === 'fruit') {
    listItem.textContent = 'Fruit! - ' + input;
    listItem.classList.add('fruit');
  } else {
    listItem.textContent = 'Legume! - ' + input;
    listItem.classList.add('legume');
  }

  listContainer.appendChild(listItem);

  // Clear input and radio buttons after adding
  document.getElementById('itemInput').value = '';
  clearRadioButtons();
}

    function deleteItem() {
    // Check if an item is selected in any of the lists
    var selectedItem = document.querySelector('.list-container li.selected');

    if (selectedItem) {
      // Ask for confirmation before deleting
      var confirmDelete = confirm('Are you sure you want to delete this item?');
      if (confirmDelete) {
        // Remove the selected item from the list
        selectedItem.parentNode.removeChild(selectedItem);
      }
    } else {
      // If no item is selected, search for the item to delete
      var searchInput = document.getElementById('searchInput').value.toLowerCase();

      // Check each list for the item
      ['fruit', 'legume', 'general'].forEach(function (listType) {
        var listContainer = document.getElementById(listType + 'sList');
        var listItems = listContainer.getElementsByTagName('li');

        // Iterate through the list items
        for (var i = 0; i < listItems.length; i++) {
          var listItemText = listItems[i].textContent.toLowerCase();

          // Check if the search term matches the item in the list
          if (listItemText.includes(searchInput)) {
            // Ask for confirmation before deleting
            var confirmDelete = confirm('Are you sure you want to delete this item?');
            if (confirmDelete) {
              // Remove the matched item from the list
              listItems[i].parentNode.removeChild(listItems[i]);
              // Clear the search input
              document.getElementById('searchInput').value = '';
              // Exit the loop after the first match is found
              return;
            }
          }
        }
      });
    }
  }
 
    function clearRadioButtons() {
      var radioButtons = document.querySelectorAll('input[name="itemType"]');
      radioButtons.forEach(function (radioButton) {
        radioButton.checked = false;
      });
    }
    function searchItem() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    var found = false;

    // Check each list for the item
    ['fruit', 'legume', 'general'].forEach(function (listType) {
      var listContainer = document.getElementById(listType + 'sList');
      var listItems = listContainer.getElementsByTagName('li');

      // Iterate through the list items
      for (var i = 0; i < listItems.length; i++) {
        var listItemText = listItems[i].textContent.toLowerCase();

        // Check if the search term matches the item in the list
        if (listItemText.includes(searchInput)) {
          // Mark the item as found and change its color
          listItems[i].classList.add('found');
          listItems[i].style.backgroundColor = '#FFFF00'; // Yellow background for found items (you can adjust this)
          found = true;
        } else {
          // Remove the "found" class and reset color from other items
          listItems[i].classList.remove('found');
          listItems[i].style.backgroundColor = '';
        }
      }
    });

    // Display an alert based on whether the item is found or not
    if (!found) {
      alert('No item with this name found in any list.');
    }
  }

  $(document).ready(function () {
    $('[data-toggle="popover"]').popover({
      html: true,
    });
  
    // Event delegation for the click on the container of lists
    $('.list-container.general').on('click', 'li', function () {
      moveItemToSpecificList(this);
    });
  });
  
  function moveItemToSpecificList(item) {
    var inputText = item.textContent.split(' - ')[1];
    var itemType = item.classList.contains('fruit') ? 'fruit' : 'legume';
  
    // Remove the item from the general list
    item.remove();
  
    // Add the item to the specific list
    var listContainer = document.getElementById(itemType + 'sList');
    var listItem = document.createElement('li');
    listItem.textContent = itemType.charAt(0).toUpperCase() + itemType.slice(1) + '! - ' + inputText;
    listContainer.appendChild(listItem);
  
    // Set the color based on the item type
    listItem.classList.add(itemType);
  }
  