function isPrime(num) {
    var divisor = 2;
    while(divisor < num) {
        if (num % divisor === 0) {
            return false;
        } else {
            divisor++;
        }
    }
    return true;
}

isPrime(49);
