////////////////////////////////////// IN DEV ////////////////////////////////////

function decToHexa(num) {
    //'0x765B0'<< 5
    var integer = num % 1;
    var frac = num - integer;

}

function decToBase(num, r) {

}

////////////////////////////////////// MATH /////////////////////////////////////

function isEven(num) {
    return !(num % 2);
}

function avg(arr) {
    var sum = 0;
    for (const num of arr) {
        sum += num;
    }
    return sum / arr.length;
}

function pow(base, exp){
    var sol = 1;
    for (let i = 0 ; i < exp ; i++){
        sol *= base;
    }
    return sol;
}

// creates a randomised id (62^5 * 5! opts)
function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

// random int
function getRandomInt(min, max) {
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// random colour
function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

// returns x mod n (in range [0, ..., n-1])
function posModn(x, n) {
    if (x < 0) return posModn(x + n, n)
    return x%n
}

// Euclid's algorithm
function gcd(a, b) {
    var remainder;
    if (a < b)
        [a, b] = [b, a];    // swap
    remainder = a % b;
    if (remainder == 0)
        return b;
    return gcd(remainder, b);
}

/////////////////////////////// ARRAYS ///////////////////////////////////////

function bubbleSort(arr) {
    for(var i = 0 ; i < arr.length ; i++){
        for(var j = 0 ; j < arr.length-1 ; j++){
            if (arr[j] > arr[j+1]){
                swap(arr, j, j+1);
            } 
        }
    }
    return;
}

function swap(arr, i1, i2){
    var tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
    return;
}

// removes duplicates in array
function toSet(arr) {
    var setArr = [];
    for (let i = 0 ; i < arr.length ; i++) {
        if (!setArr.includes(arr[i])) {
            setArr.push(arr[i]);
            // if current element is not part of the set, add it
        }
    }
    return setArr;
}

// removes duplicates in array of numbers
function toSetNum(nums) {
    var numSet = [];
    var bkt = bucket(nums);
    for (let i = 0; i < nums.length; i++) {
        if (bkt[nums[i]]) {
            numSet.push(nums[i]);
            bkt[nums[i]] = 0;
        }
    }
    return numSet;
}

// bucket for bucketSort
function bucket(nums) {
    var bucket = [];
    var _max = max(nums);
    // preparing the bucket
    for (let i = 0 ; i <= _max ; i++) {
        bucket.push(0);
    }
    // filling the bucket
    for (let i = 0 ; i < nums.length ; i++) {
        bucket[nums[i]]++;
    }
    return bucket;
}

// returning the max element in an array of numbers
function max(arr) {
    var _max = -Infinity;
    for (let i = 0 ; i < arr.length ; i++) {
        if (arr[i] > _max)
            _max = arr[i];
    }
    return _max;
}

// gets a number and returns an array of digits (each element is of type number)
function numToArray(num) {
    var arr = num.toString();
    arr = arr.split('');
    for(let i = 0 ; i < arr.length ; i++) {
        arr[i] = Number(arr[i]);
    }
    return arr;
}

// mergeSort
function mergeSort(arr) {
    if (arr.length === 1)
        return arr;

    var partition = Math.ceil(arr.length / 2);
    if (partition === 1)
        return merge(arr.slice(0, partition), arr.slice(partition));

    var sortedArr1 = mergeSort(arr.slice(0,partition));
    var sortedArr2 = mergeSort(arr.slice(partition));

    return merge(sortedArr1, sortedArr2);
}

// merge two sorted arrays
function merge(arr1, arr2) {
    var mergedArr = [];
    var i = 0, j = 0;
    while (i < arr1.length && j < arr2.length){
        if (arr1[i] < arr2[j])
            mergedArr.push(arr1[i++]);
        else
            mergedArr.push(arr2[j++]);
    }
    // if any elements are left, add to merged array
    while (i < arr1.length) {
        mergedArr.push(arr1[i++]);
    }
    while (j < arr2.length) {
        mergedArr.push(arr2[j++]);
    }
    return mergedArr;
}

///////////////////////////// UTILITY //////////////////////////////////

// gets a positive integer and returns a string with the correct suffix (st, nd, th)
function nth(num){
    let n = num.toString();
    let remainder = num % 10;

    if (n === 0) return '0';
    if (n === 13) return '13\'th'
    if (n === 12) return '12\'th';
    if (n === 11) return '11\'th';
    if (remainder > 2 || remainder === 0) return n + '\'th' ;
    if (remainder === 3) return n + '\'rd'
    if (remainder === 2) return n + '\'nd';
    if (remainder === 1) return n + '\'st';
}


//////////////////////// STORAGE SERVICE /////////////////////////////

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}