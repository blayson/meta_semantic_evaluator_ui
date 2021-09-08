export const sortData = function sortData(sortModel, data) {
  var sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  var resultOfSort = data.slice();
  resultOfSort.sort(function (a, b) {
    for (var k = 0; k < sortModel.length; k++) {
      var sortColModel = sortModel[k];
      var valueA = a[sortColModel.colId];
      var valueB = b[sortColModel.colId];
      if (valueA === valueB) {
        continue;
      }
      var sortDirection = sortColModel.sort === "asc" ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    return 0;
  });
  return resultOfSort;
};

export const filterData = function filterData(filterModel, data) {
  var filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  var resultOfFilter = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (filterModel.age) {
      var age = item.age;
      var allowedAge = parseInt(filterModel.age.filter);
      if (filterModel.age.type === "equals") {
        if (age !== allowedAge) {
          continue;
        }
      } else if (filterModel.age.type === "lessThan") {
        if (age >= allowedAge) {
          continue;
        }
      } else {
        if (age <= allowedAge) {
          continue;
        }
      }
    }
    if (filterModel.year) {
      if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.country) {
      if (filterModel.country.values.indexOf(item.country) < 0) {
        continue;
      }
    }
    resultOfFilter.push(item);
  }
  return resultOfFilter;
};
export const sortAndFilter = function sortAndFilter(
  allOfTheData,
  sortModel,
  filterModel
) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
};

export const applySort = function (sortModel) {
  let sortParams = "";
  if (sortModel) {
    sortModel.forEach((model) => {
      switch (model.colId) {
        case "feature":
          if (sortParams) {
            sortParams += `,feature ${model.sort}`;
          } else {
            sortParams += `&sort=feature ${model.sort}`;
          }
          break;
        case "sentiment":
          if (sortParams) {
            sortParams += `,sentiment ${model.sort}`;
          } else {
            sortParams += `&sort=sentiment ${model.sort}`;
          }
          break;
        case "product":
          if (sortParams) {
            sortParams += `,product ${model.sort}`;
          } else {
            sortParams += `&sort=product ${model.sort}`;
          }
          break;
        case "published_at":
          if (sortParams) {
            sortParams += `,date ${model.sort}`;
          } else {
            sortParams += `&sort=date ${model.sort}`;
          }
          break;
        default:
          sortParams += "";
      }
    });
  }
  return sortParams;
};

export const applyFilters = function (
  filterModel,
  selectedCategories,
  statusDataType
) {
  let filterParams = "";
  if (filterModel) {
    if (filterModel.product) {
      filterParams += `&product=${filterModel.product.filter.toString()}`;
    }
    if (filterModel.feature) {
      filterParams += `&feature=${filterModel.feature.filter.toString()}`;
    }
    if (filterModel.text) {
      filterParams += `&text=${filterModel.text.filter.toString()}`;
    }
  }

  if (selectedCategories)
    for (const item of selectedCategories) {
      if (filterParams) {
        filterParams += `&pcat=${item}`;
      } else {
        filterParams += `&pcat=${item}`;
      }
    }

  if (statusDataType) {
    filterParams += `&status=${statusDataType}`;
  }

  return filterParams;
};
