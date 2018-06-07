$viewDiv = $('viewDiv');
var map;
var view;
var transportationLyr;
var housingLyr;
var vectorTileLyr;

$(document).ready(function () {

        loadTwoDim();
        createLayers();
        var isOnTwoDim = true;

        $(document).on("click", "#twoDim", loadTwoDim);
        $(document).on("click", "#threeDim", loadThreeDim);
        $(document).on("click", "#option1", function(){map.add(housingLyr)});
        $(document).on("click", "#option2", function(){map.add(vectorTileLyr)});


        function createLayers() {
                require([
                        "esri/Map",
                        "esri/views/MapView",
                        "esri/layers/TileLayer",
                        "esri/layers/VectorTileLayer",
                        "dojo/dom",
                        "dojo/on",
                        "dojo/domReady!"
                ], function (Map, MapView, TileLayer, dom, on, VectorTileLayer) {

                        housingLyr = new TileLayer({
                                url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
                                id: "ny-housing",
                                opacity: 0.9
                        });

                        view.on("layerview-create", function (event) {
                                if (event.layer.id === "ny-housing") {
                                        // Explore the properties of the population layer's layer view here
                                        console.log("LayerView for male population created!", event.layerView);
                                }
                                if (event.layer.id === "streets") {
                                        // Explore the properties of the transportation layer's layer view here
                                        // Explore the properties of the transportation layer's layer view here
                                        console.log("LayerView for streets created!", event.layerView);
                                }
                                if (event.layer.id === "vectors") {
                                        // Explore the properties of the transportation layer's layer view here
                                        // Explore the properties of the transportation layer's layer view here
                                        console.log("LayerView for vectors created!", event.layerView);
                                }
                        });
                        view.when(function () {
                                housingLyr.when(function () {
                                        view.goTo(housingLyr.fullExtent);
                                });
                                vectorTileLyr.when(function () {
                                        view.goTo(vectorTileLyr.fullExtent);
                                });
                        });
                });
                require([
                        "esri/Map",
                        "esri/views/MapView",
                        "esri/layers/VectorTileLayer",
                        "dojo/domReady!"
                      ], function(Map, MapView, VectorTileLayer) {

                        vectorTileLyr = new VectorTileLayer({
                          url: "http://jsapi.maps.arcgis.com/sharing/rest/content/items/75f4dfdff19e445395653121a95a85db/resources/styles/root.json"
                        });
                });
        }

        function loadTwoDim() {
                if (!isOnTwoDim) {
                        $viewDiv.html("");

                        require([
                                "esri/Map",
                                "esri/views/MapView",
                                "dojo/domReady!"
                        ], function (Map, MapView) {
                                map = new Map({
                                        basemap: "streets"
                                });
                                view = new MapView({
                                        container: "viewDiv",
                                        map: map,
                                        zoom: 8,
                                        center: [-73.93, 40.73]
                                });
                        });
                        isOnTwoDim = true;
                }

        }

        function loadThreeDim() {

                if (isOnTwoDim) {
                        $viewDiv.html("");
                        require([
                                "esri/Map",
                                "esri/views/SceneView",
                                "dojo/domReady!"
                        ], function (Map, SceneView) {
                                map = new Map({
                                        basemap: "streets",
                                        ground: "world-elevation"
                                });
                                view = new SceneView({
                                        container: "viewDiv",     // Reference to the scene div created in step 5
                                        map: map,                 // Reference to the map object created before the scene
                                        scale: 500000000,          // Sets the initial scale to 1:50,000,000
                                        center: [-101.17, 21.78]  // Sets the center point of view with lon/lat
                                });
                        });
                        isOnTwoDim = false;
                }
        }

});