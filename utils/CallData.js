function CallData() {
  //method
  this.getDataList = function () {
    return $.getJSON("../data/Data.json");
  };
}
