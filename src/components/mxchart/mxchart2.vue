<template>
  <div class="mxchart">
    <div id="mxchartcon" class="mxchart-container"></div>
    <div id="mxchartToolbar" class="mxchart-toolbar"></div>
  </div>
</template>
<script>
var mxgraph = require("mxgraph")({
  mxImageBasePath: "@/images",
  mxBasePath: "@/components/mxchart"
});
export default {
  name: "mxchart2",
  data() {
    return {
      mygraph: {},
      mytoolbar: {}
    };
  },
  methods: {
    addToolbarItem(graph, toolbar, prototype, image) {
      let funct = function(graph, evt, cell) {
        graph.stopEditing(false);

        var pt = graph.getPointForEvent(evt);
        var vertex = graph.getModel().cloneCell(prototype);
        vertex.geometry.x = pt.x;
        vertex.geometry.y = pt.y;

        graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
      };

      // Creates the image which is used as the drag icon (preview)
      let img = toolbar.addMode(null, image, funct,);
      mxgraph.mxUtils.makeDraggable(img, graph, funct);
    },
    addVertex(icon, w, h, style) {
      let vertex = new mxgraph.mxCell(null, new mxgraph.mxGeometry(0, 0, w, h), style);
      vertex.setVertex(true);

      this.addToolbarItem(this.mygraph, this.mytoolbar, vertex, icon);
    }
  },
  mounted() {
    mxgraph.mxConnectionHandler.prototype.connectImage = new mxgraph.mxImage(
      "static/images2/connector.gif",16,16
    );
    //从toolbar demo中移植，先弄两个div，摆好位置，然后进行函数设置。
    if (!mxgraph.mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is
      // not supported.
      mxgraph.mxUtils.error("Browser is not supported!", 200, false);
    } else {
      this.mytoolbar = new mxgraph.mxToolbar(mxchartToolbar);
      this.mytoolbar.enabled = false;

      // Creates the model and the graph inside the container
      // using the fastest rendering available on the browser
      let model = new mxgraph.mxGraphModel();
      this.mygraph = new mxgraph.mxGraph(mxchartcon, model);
      this.mygraph.dropEnabled = true;

      // Matches DnD inside the graph
      mxgraph.mxDragSource.prototype.getDropTarget = function(graph, x, y) {
        var cell = graph.getCellAt(x, y);

        if (!graph.isValidDropTarget(cell)) {
          cell = null;
        }

        return cell;
      };

      // Enables new connections in the graph
      this.mygraph.setConnectable(true);
      this.mygraph.setMultigraph(false);

      // Stops editing on enter or escape keypress
      let keyHandler = new mxgraph.mxKeyHandler(this.mygraph);
      let rubberband = new mxgraph.mxRubberband(this.mygraph);

      this.addVertex(
        "static/images2/swimlane.gif",
        120,
        160,
        "shape=swimlane;startSize=20;"
      );
      this.addVertex("static/images2/rectangle.gif", 100, 40, "");
      this.addVertex("static/images2/rounded.gif", 100, 40, "shape=rounded");
      this.addVertex("static/images2/earth.png", 40, 40, "");
      this.addVertex("static/images2/rhombus.gif", 40, 40, "shape=rhombus");
      this.addVertex("static/images2/triangle.gif", 40, 40, "shape=triangle");
      this.addVertex("static/images2/cylinder.gif", 40, 40, "shape=cylinder");
      this.addVertex("static/images2/actor.gif", 30, 40, "shape=actor");
      this.mytoolbar.addLine()
    }
    //难点是如何让toolbar中拖过来的图标显示在container中。
    this.mygraph.getModel().beginUpdate();
      let cells = [];
      try {
        let xmlstr2 =
          '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="Hello," vertex="1" parent="1"><mxGeometry x="20" y="20" width="80" height="30" as="geometry"/><CustomData as="data">{"value":"v1"}</CustomData></mxCell><mxCell id="3" value="World!" vertex="1" parent="1"><mxGeometry x="200" y="150" width="80" height="30" as="geometry"/><CustomData as="data">{"value":"v2"}</CustomData></mxCell><mxCell id="4" value="" edge="1" parent="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell></root></mxGraphModel>';
        let doc = mxgraph.mxUtils.parseXml(xmlstr2);
        let decoder2 = new mxgraph.mxCodec(doc);
        //decoder2.decode(doc.documentElement, this.mygraph.getModel());
        console.log(doc.documentElement);
        console.log(doc.documentElement,decoder2);
        let elt = doc.documentElement.firstChild.firstChild;
        
        while (elt != null) {
          let tmpcell = decoder2.decodeCell(elt);
          if (tmpcell.getId() !== "0" && tmpcell.getId() !== "1") {
            cells.push(tmpcell);
          }
          elt = elt.nextSibling;
        }
        console.log(cells);
        cells.forEach(ele => {
          if(ele.isEdge()){
            console.log('a edge');
          } else if(ele.isVertex){
            console.log('a vertext');
          }
        })
        this.mygraph.addCells(cells, this.mygraph.getDefaultParent());
        //this.mygraph.insertVertex(this.mygraph.getDefaultParent(), null, 'World!', 200, 150, 80, 30);
      } finally {
        this.mygraph.getModel().endUpdate();
        //this.mygraph.setSelectionCells(cells);
        console.log(this.mygraph.getModel())
      }
  }
};
</script>
<style lang="less">
.mxchart {
  width: 100vw;
  height: 100vh;
  display: flex;
  &-container {
    width: 50%;
    height: 100%;
    background-color: #cdcdcd;
  }
  &-toolbar {
    width: 10%;
    height: 100%;
  }
}
body {
  width: 100vw;
  height: 100vh;
}
</style>
