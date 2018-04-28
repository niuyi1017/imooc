function BinaryTree(){
	var Node = function(key){
		this.key = key;
		this.left = null;
		this.right = null;
	};
	var root = null;
	
	var insertNode = function(node,newNode){
		if(newNode.key<node.key){
			if(node.left===null){
				node.left = newNode;
			}
			else{
				insertNode(node.left,newNode);
			}
		}
		else{
			if(node.right===null){
				node.right = newNode;
			}
			else{
				insertNode(node.right,newNode);
			}
		}
	};
	
	this.insert = function(key){
		var newNode = new Node(key);
		if (root===null) {
			root = newNode;
		} else{
			insertNode(root,newNode);
		}
	};
	var InorderTraverseNode = function(node,callback){
		if(node!==null){
			InorderTraverseNode(node.left,callback);
			callback(node.key);
			InorderTraverseNode(node.right,callback);
		}
	}
	this.InorderTraverse = function(callback){
		InorderTraverseNode(root,callback);
	}
	
	var preOrderTraverseNode = function(node,callback){
		if(node!==null){
			callback(node.key);
			preOrderTraverseNode(node.left,callback);
			preOrderTraverseNode(node.right,callback);
		}
	}
	this.preOrderTraverse = function(callback){
		preOrderTraverseNode(root,callback);
	}
	var postOrderTraverseNode = function(node,callback){
		if(node!==null){
			postOrderTraverseNode(node.left,callback);
			postOrderTraverseNode(node.right,callback);
			callback(node.key);
		}
	}
	this.postOrderTraverse = function(callback){
		postOrderTraverseNode(root,callback);
	}
	
	var minNode = function(node){
		if(node){
			while(node&&node.left!==null){
				node = node.left;
			}
			return node.key;
		}
	}
	this.min = function(){
		return minNode(root);
	}
	var maxNode = function(node){
		if(node){
			while(node&&node.right!==null){
				node = node.right;
			}
			return node.key;
		}
	}
	this.max = function(){
		return maxNode(root);
	}
	
	 var searchNode = function(node,key){
	 	if(node===null){
	 		return false;
	 	}
	 	
	 	if(key<node.key){
	 		return searchNode(node.left,key);
	 	}else if(key>node.key){
	 		return searchNode(node.right,key);
	 	}else{
	 		return true;
	 	}
	 }
	this.search = function(key){
		return searchNode(root,key);
	}
	var findMinNode = function(node){
		if(node){
			while(node&&node.left !==null){
				node = node.left;
				return node;
			}
		}
		return null;
	}
	var removeNode = function(node,key){
		if(node===null)
			return null;
		if(key<node.key){
			node.left = removeNode(node.left,key);
			return node;
		}else if(key>node.key){
			node.right = removeNode(node.right,key);
			return node;
		}else{
			if(node.left&&node.right ===null){
				node=null;
				return null;
			}
			if(node.left ===null){
				node = node.right;
				return node;
			}else if (node.right===null){
				node = node.left;
				return node;
			}
			var aux = findMinNode(node.right);
			node.key = aux.key;
			node.right = removeNode(node.right,aux.key);
			return node;
		}
	}
	this.remove = function(key){
		root = removeNode(root,key);
	}
}

var nodes = [8,3,10,1,6,14,4,7,13];
var binaryTree = new BinaryTree();
nodes.forEach(function(key){
	binaryTree.insert(key);
});
var callback = function(key){
	console.log(key);
}
//console.log('中序遍历 \n');
//binaryTree.InorderTraverse(callback);
//console.log('前序遍历\n');
//binaryTree.preOrderTraverse(callback);
//console.log('后序遍历\n');
//binaryTree.postOrderTraverse(callback);
console.log("Min node is "+binaryTree.min());
console.log("Max node is "+binaryTree.max());
binaryTree.remove(10);
binaryTree.InorderTraverse(callback);
console.log(binaryTree.search(7) ? "Key 7 is found":"Key 7 is not found");
//console.log(binaryTree.search(9) ? "Key 9 is found":"Key 9 is not found");
