/******************************** C R E A T E   P O S E  ***************************/

/*

Alexandre Cormier 

04/08/2020

www.alarigger.com

*/



function AL_ExposeByName(){


/*Add a sub with the same name to several drawing in one click 

*/



/***************** V A R I A B L E S */



var selectedNodes = selection.numberOfNodesSelected(); 

var curFrame = frame.current();

var POSE_NAME = "00";
var SELECTED_POSE ="00"


var numSelLayers = Timeline.numLayerSel; 


/**************** E X E C U T I O N */




	MessageLog.trace("\n=======AL_ExposeByName========")


scene.beginUndoRedoAccum("AL_ExposeByName");



inputDialog()


scene.endUndoRedoAccum();







/**************** F U N C T I O N S */ 





/*I N P U T   D I A L O G*/



function inputDialog() {



	MessageLog.trace("inputDialog")



	   var d = new Dialog()

	   d.title = "ExposeByName";

	   d.width = 100;



	var nameInput = new LineEdit();

	nameInput.label = "Sub name : ";

	nameInput.maximum = 1000;

	nameInput.minimum = 1;

	d.add( nameInput );





	if ( d.exec() ){


	 POSE_NAME = nameInput.text;
	 
	 selectPose()

	 Expose_sub()


	}





}


/*    S E L E C T   A N D   E X P O S E */


function selectPose(){

	 SELECTED_POSE = POSE_NAME
	
}



function Expose_sub(){



	MessageLog.trace("\n=======Expose_sub========")



	for ( var i = 0; i < numSelLayers; i++ ){

		if ( Timeline.selIsColumn(i)){


				var currentColumn = Timeline.selToColumn(i);

				MessageLog.trace(currentColumn);

				
				
				MessageLog.trace(SELECTED_POSE);
				
				var sub_timing = column.getDrawingTimings(currentColumn);
				
				
				
				if(sub_timing.indexOf(SELECTED_POSE)!=-1){
				
					column.setEntry(currentColumn,1,curFrame,SELECTED_POSE);
						
				}

				/*if (column.type(currentColumn) == "DRAWING"){
					
					var DrawingName =column.getDrawingName(currentColumn,curFrame)

							var split1;
							var split1=DrawingName.split('-')[1];

					}	
					
				}*/


			}


	}
	
}


}



