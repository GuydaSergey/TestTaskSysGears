import sort from "./sort-method"
import assert from 'assert'
import {isArray, isFunction, forEach, isObject} from "lodash";

export default class GrowingPacker {
	constructor({
		sortMethod = sort.maxside,
		blocks = []
	} = {}) {

		this.sortMethod = isFunction(sortMethod) ? sortMethod : sort[sortMethod];
		this.blocks = blocks;

		assert(isArray(blocks), 'blocks parameters must be an Array');
		assert(isFunction(this.sortMethod), 'sortMethod parameters must be a function or a valid sort method name');
		
		this.root = {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};
	}

	/*inject(){
		return this;
	}

	init(){
		return this;
	}*/

	get size(){
		return {
			width: this.width,
			height: this.height
		};
	}

	get width(){
		return this.root.w;
	}

	get height(){
		return this.root.h;
	}

	pack(blocks = this.blocks){
		blocks.sort(this.sortMethod);

		let n, node, block, len = blocks.length;
		let w = len > 0 ? blocks[0].w : 0;
		let h = len > 0 ? blocks[0].h : 0;

		this.root = {
			x: 0,
			y: 0,
			w: w,
			h: h
		};

		for (n = 0; n < len ; n++) {
			block = blocks[n];
			if (node = this.findNode(this.root, block.w, block.h)){
				block.fit = this.splitNode(node, block.w, block.h);
			}
			else{
				block.fit = this.growNode(block.w, block.h);
			}
		}

		return {
			blocks,
			rectangles: () => {
				return this.rectangles(blocks);
			},
			width: this.width,
			height: this.height
		};
	}
	
	rectangles(blocks = this.blocks){
		forEach(blocks, block => {
			let fit = block.fit;

			block.fit = isObject(fit);
			block.x = fit.x;
			block.y = fit.y;
			block.width = block.w;
			block.height = block.h;
		});

		return blocks;
	}

	findNode(root, w, h) {
		if (root.used){
			return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
		}
		else if ((w <= root.w) && (h <= root.h)){
			return root;
		}

		return null;
	}

	splitNode(node, w, h) {
		node.used = true;
		node.down = {
			x: node.x,
			y: node.y + h,
			w: node.w,
			h: node.h - h
		};

		node.right = {
			x: node.x + w,
			y: node.y,
			w: node.w - w,
			h: h
		};

		return node;
	}

	growNode(w, h) {
		let canGrowDown  = (w <= this.root.w);
		let canGrowRight = (h <= this.root.h);

		let shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
		let shouldGrowDown  = canGrowDown  && (this.root.w >= (this.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

		if (shouldGrowRight){
			return this.growRight(w, h);
		}
		else if (shouldGrowDown){
			return this.growDown(w, h);
		}
		else if (canGrowRight){
			return this.growRight(w, h);
		}
		else if (canGrowDown){
			return this.growDown(w, h);
		}

		return null; // need to ensure sensible root starting size to avoid this happening
	}

	growRight(w, h) {
		let node;

		this.root = {
			used: true,
			x: 0,
			y: 0,
			w: this.root.w + w,
			h: this.root.h,
			down: this.root,
			right: {
				x: this.root.w,
				y: 0,
				w: w,
				h: this.root.h
			}
		};

		if (node = this.findNode(this.root, w, h)){
			return this.splitNode(node, w, h);
		}
		
		return null;
	}

	growDown(w, h) {
		let node;

		this.root = {
			used: true,
			x: 0,
			y: 0,
			w: this.root.w,
			h: this.root.h + h,
			down: {
				x: 0,
				y: this.root.h,
				w: this.root.w,
				h: h
			},
			right: this.root
		};

		if (node = this.findNode(this.root, w, h)){
			return this.splitNode(node, w, h);
		}

		return null;
	}
}