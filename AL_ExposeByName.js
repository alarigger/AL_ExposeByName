/******************************** C R E A T E   P O S E  ***************************/

/*

Alexandre Cormier 

06/08/2020

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

var SUBLIST = [];


/**************** E X E C U T I O N */




	MessageLog.trace("\n=======AL_ExposeByName========")


scene.beginUndoRedoAccum("AL_ExposeByName");

		 
createUniqueSubList()

inputDialog()


scene.endUndoRedoAccum();







/**************** F U N C T I O N S */ 





/*I N P U T   D I A L O G*/



function inputDialog() {



	MessageLog.trace("inputDialog")



	   var d = new Dialog()

	   d.title = "ExposeByName";

	   d.width = 100;



	/*var nameInput = new LineEdit();

	nameInput.label = "Sub name : ";

	nameInput.maximum = 1000;

	nameInput.minimum = 1;

	d.add( nameInput );*/
	
	
	
	var subBox = new ComboBox();
	
	subBox.label = "Available subs : ";
	
	subBox.editable = true;
	
	subBox.itemList = SUBLIST;
	
	d.add( subBox );





	if ( d.exec() ){


		 SELECTED_POSE = subBox.currentItem;
		 
		 Expose_sub()


	}





}


/*    S E L E C T   A N D   E X P O S E */



function createUniqueSubList (){

	for ( var i = 0; i < numSelLayers; i++ ){

			if ( Timeline.selIsColumn(i)){


					var currentColumn = Timeline.selToColumn(i);

					MessageLog.trace(currentColumn);

					
					
					MessageLog.trace(SELECTED_POSE);
					
					var sub_timing = column.getDrawingTimings(currentColumn);
					
					for (var s = 0 ; s < sub_timing.length ; s++){
						
						var current_sub = sub_timing[s];
						var current_sub_name = current_sub;
						//var current_sub_name = extract_subname(current_sub);
						
						if(SUBLIST.indexOf(current_sub_name)==-1){
							
							SUBLIST.push(current_sub_name);
								
						}
						
					}

				}


		}		
		
		MessageLog.trace(SUBLIST);
	
}

function extract_subname(big_name){
	
	MessageLog.trace("big_name " +big_name);
	
	var split0=big_name.split('-');
	
	var   extracted_subname = "nope"

	var split1=split0[1];
	
	if(split1 != ""){

		var split2 = split1.split('.')
		
		if(split2 != ""){
			extracted_subname= split2[0];	
			
			MessageLog.trace(extracted_subname);
			
							
		}
		
	
		
	}
	return extracted_subname;
	
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


			}


	}
	
}


}



