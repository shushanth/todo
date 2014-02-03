/*@ task.js which has MV**/

(function ($){
	

	


/*main model for this enitre built up*/

	window. taskModel=Backbone.Model.extend({

		defaults:{

			task:''

		}
	
	});


/*main collection for this enitre built up*/

	window.taskCollection=Backbone.Collection.extend({


		model: taskModel


	});



 	/*task adding view and updating the collection for new model	*/

	window.taskAddView=Backbone.View.extend({


		el:$('#mainLayout'), /*main root tag*/

		events:{
		'click .butt' :'taskUpdate',
		'keypress .tasks' :'taskOnKeyPress'
		},

		taskOnKeyPress:function(evt){
			
			if(evt.keyCode==13) this.taskUpdate();

		},

		taskUpdate:function(){

			this.newTask=$('.tasks');
			if(! this.newTask.val()) return;

			var updatedTasks=new taskModel({task:this.newTask.val()}); /*creating tasks model*/
			this.collection.add(updatedTasks);

			this.newTask.val('');

			/*ImageAnimate */
			this.AnimateImagecreateObj();
			
		},

		AnimateImagecreateObj:function(evt){
			
		this.Animateobj={yMoveDown:'20',yMoveUp:'50'};
		this.imageAnimate(this.Animateobj);

		},

		imageAnimate:function(move){
			
			var movementDown=eval(move.yMoveDown); var movementUp=eval(move.yMoveDown)+eval(move.yMoveUp);
			var imageMove=$('.taskImage');
			imageMove.animate({'top':movementUp},500);
			imageMove.animate({'top':movementDown},200);
			$('ul li').first().css('border-top','none'); 
		}
	});



/* main collections view for this enitre built up*/

	window.taskViewCollection=Backbone.View.extend({

		tagName:'ul',

		initialize:function(){

		   this.collection.on('add',this.taskAdding,this);
		   this.collection.on('destroy',this.taskdelete,this);

		},


		render:function(){

			this.collection.each(this.taskAdding,this)

			return this;

		},

		taskAdding:function(taskModel){

			/*call to get each child elements and build the parent and its structure*/
			this.view=new taskView({model:taskModel})
			

			this.$el.append(this.view.render().el);
			$('.taskCount').html(taskModel.collection.length);

		},

		taskdelete:function(){

		var delTask=this.collection.length;
		$('.taskCount').html(delTask);

		}

	});



//creating the each child view which is used @ taskViewCollection for creating entire parent stucture

	var taskView=Backbone.View.extend({

		tagName:'li',
		template:_.template($('#taskTemp').html()),
		events:{
			'click .edit':'editThis',
			'click .delButt':'deleteThis',
		},

		initialize:function(){
		
		this.model.on('change',this.render,this);
		this.model.on('destroy',this.remove,this);
	

		},

		editThis:function(){
		
		var newTaskCreated=prompt('what you would like change Task to?',this.model.get('task'));
		if(!newTaskCreated) return;
		this.model.set('task',newTaskCreated);

		
		},

		deleteThis:function(){
		this.model.destroy();
		
		},
		
		remove:function(){
		this.$el.remove(); 
				
		},

		render:function(){
		
			var tempContent=this.template(this.model.toJSON());
			this.$el.html(tempContent);
			return this;
			
		}

	});




var task=new taskCollection;

var taV=new taskAddView({collection:task});
var tv=new taskViewCollection({collection:task});

$('.taskLists').html(tv.render().el);

})(jQuery);