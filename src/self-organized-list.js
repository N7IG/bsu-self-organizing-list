class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.counter = 0;
    }

    insert(data) {
    	
    	if (this.head == null){
    		this.tail = new Node(data);
    		this.head = this.tail;

    	} else {
    		this.tail.next = new Node(data);
    		this.tail.next.prev = this.tail;
    		this.tail = this.tail.next;  
    	}    
    	this.counter++;	  	

    }

    size() {

    	return this.counter;
    }

    at(index) {

    	if ((index + 1) > this.counter || index < 0){
    		return null;
    	} else {
    		var tmpNode = this.head;
    		for (var i = 0; i < index; i++) {
    			tmpNode = tmpNode.next;
    		}
    		return tmpNode.data;
    	}	
    }

    findNode(data) {
    	var tmpNode = this.head;
    	var index = 0;
    	while (index < this.counter){
    		if (tmpNode.data === data){
    			return tmpNode;
    		} 
    		tmpNode =  tmpNode.next;   
    		index++; 		
    	}
    	return null;    	
    }

    toArray() {
    	var arr = [];
    	var tmpNode = this.head;
    	for (var i = 0; i < this.counter; i++) {
    		arr.push(tmpNode.data);
    		tmpNode = tmpNode.next;
    	}
    	return arr;
    }

    removeAt(index) {
    	if ((index + 1) > this.counter || index < 0){
    		var tmpNode = null;
    	} else {
    		var tmpNode = this.head;
    		for (var i = 0; i < index; i++) {
    			tmpNode = tmpNode.next;
    		}
    	}	
    	
    	if (tmpNode === null){
    		return;
    	}
    	if (this.counter === 1){
			this.head = null;
    		this.tail = null;
    		this.counter = 0;
    		return;
    		 	
    	}
    	if (tmpNode === this.head){
    		this.head.next.prev = null;
    		this.head = this.head.next;
    		this.counter--;
    		return;
    	}
    	if (tmpNode === this.tail){
    		this.tail.prev.next = null;
    		this.tail = this.tail.prev;
    		this.counter--;
    		return;
    	}
    	tmpNode.prev.next = tmpNode.next;
    	tmpNode.next.prev = tmpNode.prev;    
    	this.counter--;    	
    }

    moveToFront(node) {
    	var tmpNode = node;

    	if (node === null){
    		return;
    	}
    	if (node === this.head){
    		return;
    	}
    	if (node === this.tail){
    		this.tail.prev.next = null;
    		this.tail = this.tail.prev;
    		this.head.prev = node;
    		node.next = this.head;
    		node.prev = null;
    		this.head = node;
    		return;
    	}
    	node.prev.next = node.next;
    	node.next.prev = node.prev;
    	node.next = this.head;
    	node.prev = null;
    	this.head = node;
    }

    reorganize(data) {
    	var tmpNode = this.findNode(data);
    	if (tmpNode === null){
    		return false;
    	}
    	this.moveToFront(tmpNode);
    	return true;
    }

}

module.exports = {
    SelfOrganizedList,
    Node
};
