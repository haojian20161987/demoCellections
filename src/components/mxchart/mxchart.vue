<template>
  <div class="mxchart">
    <div id="mxchartcon" class="mxchart-container"></div>
    <div id="mxchartToolbar" class="mxchart-toolbar"></div>
    <div class="mxchart-toolbar2">
      <img src="/static/images2/earth.png" draggable="true" @dragstart="imgDrag($event)" data-id="123"/>
      <Button @click="getJson">点击输出json</Button>
    </div>
  </div>
</template>
<script>
var mxgraph = require("mxgraph")({
  mxImageBasePath: "/src/images",
  mxBasePath: "/src/components/mxchart"
});
export default {
  name: "mxchart",
  data() {
    return {
      mygraph: {},
      mytoolbar: {},
      //xmlstr:'<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="hello flslsllslss&#10;lsllslsfjksjf反反复复付付付" style="verticalLabelPosition=bottom;indicatorSpacing=0;fontSize=14;shape=image;image=/static/images2/earth.png;dataSrc=/my/tt;" vertex="1" parent="1"><mxGeometry x="341" y="106" width="48" height="48" as="geometry"/></mxCell><mxCell id="3" value="hello flslsllslss&#10;lsllslsfjksjf反反复复付付付" style="verticalLabelPosition=bottom;indicatorSpacing=0;fontSize=14;shape=image;image=/static/images2/earth.png;dataSrc=/my/tt;" vertex="1" parent="1"><mxGeometry x="620" y="106" width="48" height="48" as="geometry"/></mxCell><mxCell id="4" edge="1" parent="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell></root></mxGraphModel>',
      xmlstr:
        '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="hello flslsllslss&#10;lsllslsfjksjf反反复复付付付" style="verticalLabelPosition=bottom;indicatorSpacing=0;fontSize=14;shape=image;image=/static/images2/earth.png;dataSrc=/my/tt;" vertex="1" parent="1"><mxGeometry x="388" y="137" width="48" height="48" as="geometry"/></mxCell><mxCell id="3" value="hello flslsllslss&#10;lsllslsfjksjf反反复复付付付" style="verticalLabelPosition=bottom;indicatorSpacing=0;fontSize=14;shape=image;image=/static/images2/earth.png;dataSrc=/my/tt;" vertex="1" parent="1"><mxGeometry x="705" y="326" width="48" height="48" as="geometry"/></mxCell><mxCell id="4" edge="1" parent="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell></root></mxGraphModel>',
      mycodec: {}
    };
  },
  methods: {
    addToolbarItem(graph, toolbar, prototype, image) {
      let funct = function(graph, evt, cell) {
        graph.stopEditing(false);

        var pt = graph.getPointForEvent(evt);
        //console.log(prototype)
        var vertex = graph.getModel().cloneCell(prototype);
        vertex.geometry.x = pt.x;
        vertex.geometry.y = pt.y;

        //console.log(graph)
        //console.log(vertex);

        graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
      };

      // Creates the image which is used as the drag icon (preview)
      let img = toolbar.addMode(null, image, funct);
      mxgraph.mxUtils.makeDraggable(img, graph, funct);
    },
    addVertex(icon, w, h, style) {
      //let vertex = new mxgraph.mxCell(null, new mxgraph.mxGeometry(0, 0, w, h), style);
      let vertex = new mxgraph.mxCell(
        null,
        new mxgraph.mxGeometry(0, 0, w, h),
        style
      );
      vertex.setVertex(true);

      this.addToolbarItem(this.mygraph, this.mytoolbar, vertex, icon);
    },
    ob2str(obj) {
      let keys = Object.keys(obj);
      let str = "";
      keys.forEach(ele => {
        str += ele + "=" + obj[ele] + ";";
      });
      return str;
    },
    nudge(keyCode) {
      //通过四个方向键控制位置。
      if (!this.mygraph.isSelectionEmpty()) {
        let dx = 0;
        let dy = 0;

        if (keyCode == 37) {
          dx = -1;
        } else if (keyCode == 38) {
          dy = -1;
        } else if (keyCode == 39) {
          dx = 1;
        } else if (keyCode == 40) {
          dy = 1;
        }

        this.mygraph.moveCells(this.mygraph.getSelectionCells(), dx, dy);
      }
    },
    //drag相关
    imgDrag(e) {
      e.dataTransfer.setData("src", e.target.getAttribute("src"));
    },
    handlerDrop2(graph, evt, x, y) {
      let res = graph.insertVertex(
        null,
        null,
        "hello flslsllslss\nlsllslsfjksjf反反复复付付付",
        x,
        y,
        48,
        48,
        this.ob2str(this.mygraph.getStylesheet().styles.style2) +
          "shape=image;image=" +
          evt.dataTransfer.getData("src") +
          ";dataSrc=/my/tt;"
      );
      //下面代码可以得到如下返回值，可以将节点对应数据库id值保存在这里。
      //shape=image;image=/static/images2/earth.png;dataSrc=/my/tt;
      console.log(res.getStyle());
    },
    getJson() {
      let encoder = new mxgraph.mxCodec();
      let node = encoder.encode(this.mygraph.getModel());
      console.log(node);
      //console.log(mxgraph.mxUtils.getXml(node))
      //mxgraph.mxUtils.popup(mxgraph.mxUtils.getXml(node), true);
      //console.log(mxgraph.mxUtils.getXml(node));
      //console.log('bidui:',this.mygraph.getModel())
    }
  },
  mounted() {
    mxgraph.mxConnectionHandler.prototype.connectImage = new mxgraph.mxImage(
      "static/images2/connector.gif",
      16,
      16
    );
    //从toolbar demo中移植，先弄两个div，摆好位置，然后进行函数设置。
    if (!mxgraph.mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is
      // not supported.
      mxgraph.mxUtils.error("Browser is not supported!", 200, false);
    } else {
      // Disables built-in context menu
      mxgraph.mxEvent.disableContextMenu(document.body);
      //guide lines  Enables guides
      mxgraph.mxGraphHandler.prototype.guidesEnabled = true;
      // Alt disables guides
      mxgraph.mxGraphHandler.prototype.useGuidesForEvent = function(me) {
        return !mxgraph.mxEvent.isAltDown(me.getEvent());
      };
      // Defines the guides to be red (default)
      mxgraph.mxConstants.GUIDE_COLOR = "#FF0000";

      // Defines the guides to be 1 pixel (default)
      mxgraph.mxConstants.GUIDE_STROKEWIDTH = 1;

      // Enables snapping waypoints to terminals
      mxgraph.mxEdgeHandler.prototype.snapToTerminals = true;

      this.mytoolbar = new mxgraph.mxToolbar(mxchartToolbar);
      this.mytoolbar.enabled = false;

      // Creates the model and the graph inside the container
      // using the fastest rendering available on the browser
      let model = new mxgraph.mxGraphModel();
      this.mygraph = new mxgraph.mxGraph(mxchartcon, model);
      this.mygraph.dropEnabled = true;
      //this.mygraph.setEnabled(true);
      this.mygraph.setConnectable(true);
      this.mygraph.gridSize = 30;

      //drag事件相关。
      mxgraph.mxEvent.addListener(mxchartcon, "dragover", evt => {
        if (this.mygraph.isEnabled()) {
          evt.stopPropagation();
          evt.preventDefault();
        }
      });
      mxgraph.mxEvent.addListener(mxchartcon, "drop", evt => {
        console.log(evt.dataTransfer.getData("src"));
        if (this.mygraph.isEnabled()) {
          evt.stopPropagation();
          evt.preventDefault();

          // Gets drop location point for vertex
          var pt = mxgraph.mxUtils.convertPoint(
            this.mygraph.container,
            mxgraph.mxEvent.getClientX(evt),
            mxgraph.mxEvent.getClientY(evt)
          );
          var tr = this.mygraph.view.translate;
          var scale = this.mygraph.view.scale;
          var x = pt.x / scale - tr.x;
          var y = pt.y / scale - tr.y;

          this.handlerDrop2(this.mygraph, evt, x, y);
        }
      });
      // Changes the default style for edges "in-place" and assigns
      // an alternate edge style which is applied in mxGraph.flip
      // when the user double clicks on the adjustment control point
      // of the edge. The ElbowConnector edge style switches to TopToBottom
      // if the horizontal style is true.
      let edgeStyle = this.mygraph.getStylesheet().getDefaultEdgeStyle();
      edgeStyle[mxgraph.mxConstants.STYLE_ROUNDED] = true;
      edgeStyle[mxgraph.mxConstants.STYLE_EDGE] =
        mxgraph.mxEdgeStyle.ElbowConnector;
      this.mygraph.alternateEdgeStyle = "elbow=vertical";
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
      //let keyHandler = new mxgraph.mxKeyHandler(this.mygraph);
      let rubberband = new mxgraph.mxRubberband(this.mygraph);

      let tmpstyle = {};
      tmpstyle[mxgraph.mxConstants.STYLE_SHAPE] =
        mxgraph.mxConstants.SHAPE_LABEL;
      tmpstyle[mxgraph.mxConstants.STYLE_IMAGE] = "/static/images2/earth.png";
      tmpstyle[mxgraph.mxConstants.STYLE_IMAGE_WIDTH] = "48";
      tmpstyle[mxgraph.mxConstants.STYLE_IMAGE_HEIGHT] = "48";
      tmpstyle[mxgraph.mxConstants.STYLE_IMAGE_ALIGN] =
        mxgraph.mxConstants.ALIGN_CENTER;
      tmpstyle[mxgraph.mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] =
        mxgraph.mxConstants.ALIGN_CENTER;
      //tmpstyle[mxgraph.mxConstants.STYLE_STROKEWIDTH] = 0;
      tmpstyle[mxgraph.mxConstants.STYLE_STROKECOLOR] = "transparent";
      tmpstyle[mxgraph.mxConstants.STYLE_FILLCOLOR] = "transparent";
      this.mygraph.getStylesheet().putCellStyle("style1", tmpstyle);
      //下面是设置label的格式，位置设为bottom，
      let tmpstyle2 = {};
      tmpstyle2[mxgraph.mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "bottom";
      //tmpstyle2[mxgraph.mxConstants.WORD_WRAP] = 'break-word';
      //tmpstyle2[mxgraph.mxConstants.STYLE_WHITE_SPACE] = 'wrap';
      //tmpstyle2[mxgraph.mxConstants.STYLE_LABEL_WIDTH] = '48';
      //tmpstyle2[mxgraph.mxConstants.STYLE_RESIZE_WIDTH] = '48';
      tmpstyle2[mxgraph.mxConstants.STYLE_INDICATOR_SPACING] = "0";
      tmpstyle2[mxgraph.mxConstants.STYLE_FONTSIZE] = "14";
      this.mygraph.getStylesheet().putCellStyle("style2", tmpstyle2);

      this.addVertex(
        "static/images2/swimlane.gif",
        120,
        160,
        "shape=swimlane;startSize=20;"
      );
      this.addVertex("static/images2/rectangle.gif", 100, 40, "");
      this.addVertex("static/images2/rounded.gif", 100, 40, "shape=rounded");
      this.addVertex(
        "static/images2/earth.png",
        48,
        48,
        this.ob2str(this.mygraph.getStylesheet().styles.style1)
      ); //"shape=label;image=/static/images2/earth.png"
      this.addVertex("static/images2/rhombus.gif", 40, 40, "shape=rhombus");
      this.addVertex("static/images2/triangle.gif", 40, 40, "shape=triangle");
      this.addVertex("static/images2/cylinder.gif", 40, 40, "shape=cylinder");
      this.addVertex("static/images2/actor.gif", 30, 40, "shape=actor");
      this.mytoolbar.addLine();
      this.mytoolbar.addActionCombo("combo1");
      this.mytoolbar.addActionOption;
      //绑定按键。
      this.mygraph.container.focus();
      let keyHandler = new mxgraph.mxKeyHandler(this.mygraph);
      keyHandler.enter = function() {};

      keyHandler.bindKey(37, () => {
        this.nudge(37);
      });

      keyHandler.bindKey(38, () => {
        this.nudge(38);
      });

      keyHandler.bindKey(39, () => {
        this.nudge(39);
      });

      keyHandler.bindKey(40, () => {
        this.nudge(40);
      });
      keyHandler.bindKey(46, () => {
        this.mygraph.removeCells(this.mygraph.getSelectionCells(), true);
      });

      //添加右键菜单。第一段是禁用自带的右键菜单。
      let mxCellRendererInstallCellOverlayListeners =
        mxgraph.mxCellRenderer.prototype.installCellOverlayListeners;
      mxgraph.mxCellRenderer.prototype.installCellOverlayListeners = function(
        state,
        overlay,
        shape
      ) {
        mxCellRendererInstallCellOverlayListeners.apply(this, arguments);
        let graph = state.view.graph;
        mxgraph.mxEvent.addGestureListeners(
          shape.node,
          function(evt) {
            graph.fireMouseEvent(
              mxgraph.mxEvent.MOUSE_DOWN,
              new mxgraph.mxMouseEvent(evt, state)
            );
          },
          function(evt) {
            graph.fireMouseEvent(
              mxgraph.mxEvent.MOUSE_MOVE,
              new mxgraph.mxMouseEvent(evt, state)
            );
          },
          function(evt) {
            if (mxgraph.mxClient.IS_QUIRKS) {
              graph.fireMouseEvent(
                mxgraph.mxEvent.MOUSE_UP,
                new mxgraph.mxMouseEvent(evt, state)
              );
            }
          }
        );
      };

      this.mygraph.popupMenuHandler.autoExpand = true;
      this.mygraph.popupMenuHandler.factoryMethod = (menu, cell, evt) => {
        menu.addItem("删除节点", null, () => {
          this.mygraph.removeCells(this.mygraph.getSelectionCells(), true);
        });
        menu.addSeparator();

        let submenu1 = menu.addItem("Submenu 1", null, null);

        menu.addItem(
          "Subitem 1",
          null,
          function() {
            alert("Subitem 1");
          },
          submenu1
        );
        menu.addItem(
          "Subitem 1",
          null,
          function() {
            alert("Subitem 2");
          },
          submenu1
        );
      };
    }
    //难点是如何让toolbar中拖过来的图标显示在container中。

    //decode
    function CustomData(value) {
      this.value = value;
    }
    // let codec = new mxgraph.mxObjectCodec(new CustomData());
    // //var codec = new mxObjectCodec(new CustomData());
    // // var codec = new mxgraph.mxObjectCodec(new mxgraph.mxGraphModel());
    // codec.encode = function(enc, obj) {
    //   var node = enc.document.createElement("CustomData");
    //   mxUtils.setTextContent(node, JSON.stringify(obj));

    //   return node;
    // };

    // codec.decode = function(dec, node, into) {
    //   console.log(dec, node, into)
    //   var obj = JSON.parse(mxUtils.getTextContent(node));
    // 	obj.constructor = CustomData;

    //   return obj;
    // };

    // mxgraph.mxCodecRegistry.register(codec);

    this.$nextTick(() => {
      this.mygraph.getModel().beginUpdate();
      let cellsVertex = [],cellsEdge = [],cellsVertexId = {};
      try {
        let doc = mxgraph.mxUtils.parseXml(this.xmlstr);
        let decoder2 = new mxgraph.mxCodec(doc);
        let elt = doc.documentElement.firstChild.firstChild;
        //在处理的时候，将vertex和edge分开，先添加vertex再添加edge。
        while (elt != null) {
          let tmpcell = decoder2.decodeCell(elt);
          if (tmpcell.getId() !== "0" && tmpcell.getId() !== "1") {
            //cells.push(tmpcell);
            if(tmpcell.isEdge()){
              cellsEdge.push(tmpcell);
            } else if(tmpcell.isVertex()){
              cellsVertex.push(tmpcell);
            }
          }
          elt = elt.nextSibling;
        }
        //console.log(doc.documentElement)
        //console.log(cells);
        //this.mygraph.addCells(cells, this.mygraph.getDefaultParent());
        let parent = this.mygraph.getDefaultParent();
        cellsVertex.forEach(ele => {
          let tmpGeo = ele.getGeometry();
          let tmpNode = this.mygraph.insertVertex(parent,ele.getId(),ele.getValue(),tmpGeo.getAttribute('x'),tmpGeo.getAttribute('y'),tmpGeo.getAttribute('width'),tmpGeo.getAttribute('height'),ele.getStyle());
          cellsVertexId[ele.getId()] = tmpNode;
        })
        console.log(cellsVertexId)
        cellsEdge.forEach(ele => {
          console.log(ele)
          let res = this.mygraph.insertEdge(parent,ele.getId(),'',cellsVertexId[ele.getTerminal(true).getId()],cellsVertexId[ele.getTerminal(false).getId()],'');
          //console.log(res.isEdge(),res)
          //this.mygraph.addCell(parent,ele)
        })
        //console.log(cellsVertex)
        //console.log(cellsVertex[0].getGeometry().getAttribute('x'));
        //console.log(decoder2.decodeCell(cellsVertex[0].getGeometry()).get)
        //let geoKeys = Object.keys(cellsVertex[0].geometry.attributes);
        //console.log(geoKeys)
      } finally {
        this.mygraph.getModel().endUpdate();
        //this.mygraph.setSelectionCells(cells);
      }
      //this.mygraph.getModel().beginUpdate();
      
      //   console.log("start");

      //let res = decoder2.decode(doc.documentElement, this.mygraph.getModel());
      //console.log(res)
      //   //codec.decode(doc.documentElement, this.mygraph.getModel());
      //console.log(this.mygraph.getModel())
      //console.log(decoder2.getElementById('2'));

      //this.mygraph.refresh();
    });
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
    //background-color: #cdcdcd;
    background: url("../../../static/images2/grid.gif");
    cursor: default;
  }
  &-toolbar {
    width: 10%;
    height: 100%;
  }
  &-toolbar2 {
    width: 10%;
    height: 100%;
  }
}
body {
  width: 100vw;
  height: 100vh;
}
body div.mxPopupMenu {
  -webkit-box-shadow: 3px 3px 6px #c0c0c0;
  -moz-box-shadow: 3px 3px 6px #c0c0c0;
  box-shadow: 3px 3px 6px #c0c0c0;
  background: white;
  position: absolute;
  border: 3px solid #e7e7e7;
  padding: 3px;
}
body table.mxPopupMenu {
  border-collapse: collapse;
  margin: 0px;
}
body tr.mxPopupMenuItem {
  color: black;
  cursor: default;
}
body td.mxPopupMenuItem {
  padding: 6px 60px 6px 30px;
  font-family: Arial;
  font-size: 10pt;
}
body td.mxPopupMenuIcon {
  background-color: white;
  padding: 0px;
}
body tr.mxPopupMenuItemHover {
  background-color: #eeeeee;
  color: black;
}
table.mxPopupMenu hr {
  border-top: solid 1px #cccccc;
}
table.mxPopupMenu tr {
  font-size: 4pt;
}
</style>
