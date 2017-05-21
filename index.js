Vue.component('dum', {
	template : '<span>Dummy component</span>'
});

Vue.component('btn-radio', {
	props: {
		id: String,
		label: String
	},

	template :
'<div \
     v-on:click="btnClick" \
     class="btn" \
     v-bind:class="{ btn_active:checked }"> \
	{{ label }} \
</div>',
	
	data : function() {
		return {
			checked : false
		}
	},

	methods : {
		btnClick : function () {
			if(!this.checked) {
				this.checked = true;
				this.$emit('btn-changed', this);
			}
		}
	}
});

Vue.component('btn-radio-box', {
	props: {
		id: String
	},
	
	template :
'<div \
     v-on:click="groupClick" \
     class="btn-radio-box" \
     v-bind:class="{ active:checked }"> \
	 <slot></slot> \
</div>',
	
	data : function() {
		return {
			checked : false
		}
	},

	methods : {
		groupClick : function() {
			if(!this.checked) {
				this.checked = true;
				this.$emit('group-changed', this);
			}
		}
	}
});

var app = new Vue({
	el : '#app',
	data : {
		currentBtn : null,
		currentGroup : null,
		prevGroup : null,
		prevBtn : null
	},
	methods : {
		onBtnChanged : function(eventObj) {

			this.prevBtn = this.currentBtn;
			this.currentBtn = eventObj;

			if(this.prevBtn != null && this.currentBtn != this.prevBtn) {
				this.prevBtn.checked = false;
			}
		},

		onGroupChanged : function(eventObj) {

			this.prevGroup = this.currentGroup;
			this.currentGroup = eventObj;

			if(this.prevGroup != null && this.prevGroup != this.currentGroup) {
				this.prevGroup.checked = false;
			}

			if(this.currentBtn.$parent.id != this.currentGroup.id) {
				this.currentBtn.checked = false;
				this.prevBtn = this.currentBtn = null;
			}
		}
	},
	computed : {
		message : function() {
			if(this.currentBtn == null || this.currentGroup == null)
				return 'nothing';
			else
				return 'item #' + this.currentGroup.id + '-' + this.currentBtn.id;
		}
	}
});