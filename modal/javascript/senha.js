function senha() {
    var part1 = document.getElementById('entrada1').value;
    var part2 = document.getElementById('entrada2').value;
    var part3 = document.getElementById('entrada3').value;
    var part4 = document.getElementById('entrada4').value;
    var part5 = document.getElementById('entrada5').value;
    var part6 = document.getElementById('entrada6').value;

    
    document.getElementById('entrada1').value = '';
    document.getElementById('entrada2').value = '';
    document.getElementById('entrada3').value = '';
    document.getElementById('entrada4').value = '';
    document.getElementById('entrada5').value = '';
    document.getElementById('entrada6').value = '';
    

    var senha = `${part1}${part2}${part3}${part4}${part5}${part6}`;

    console.log(senha);
}
