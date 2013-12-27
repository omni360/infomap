
//======================================================================================
//  Description: 自定义事件--Resize
//  Created Date: 2012-12-17
//  Modify Date: 2012-12-17
//  Author: lvmy
//======================================================================================

Space3D.ResizeEvent = function (scene){
    Space3D.Event.call(this);
    this.scene = scene;
    window.onresize = this.resizeHandler.bind(this);
}

Space3D.ResizeEvent.prototype = Object.create(Space3D.Event.prototype);


Space3D.ResizeEvent.prototype.resizeHandler = function (){
    for (i = 0; i < Space3D.ViewportLibrary.length; i++){
        Space3D.ViewportLibrary[i].resizeHandler();
    }
   // this.scene.renderer.setSize( window.innerWidth, window.innerHeight );
   console.log($(this.scene.container).width())
   this.scene.renderer.setSize( $(this.scene.container).width(), $(this.scene.container).height() );
};
