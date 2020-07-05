export const WORDS_MINIMUM_AMOUNT = 10;
export const PART_OF_NEW_WORDS_IN_TOTAL = 0.5;

export const DEFAULT_SETTINGS = {
	progress : {
		group : 0,
		page : 0,
	},

	useLearnedWords : true,

	incProgress : function incProgress(){
		this.progress.page += 1;
		console.log("don't call me to many times");
	},

	saveParameters : function saveParameters() {
		console.log('saveParameters()');
	},
};
