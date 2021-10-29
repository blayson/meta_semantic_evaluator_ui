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
        case "suggestion_time":
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
  dataStatus
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

  if (dataStatus) {
    filterParams += `&status=${dataStatus}`;
  }

  return filterParams;
};
