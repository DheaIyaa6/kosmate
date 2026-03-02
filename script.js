// Variabel global untuk menyimpan baris yang sedang diedit
var barisEdit = null;

function tambahData() {
    var nama = document.getElementById("nama").value.trim();
    var kamar = document.getElementById("kamar").value.trim();
    var hp = document.getElementById("hp").value.trim();

    if (!nama || !kamar || !hp) {
        alert("Semua field harus diisi.");
        return;
    }

    var regexNama = /^[a-zA-Z\s]+$/;
    if (!regexNama.test(nama)) {
        alert("Nama hanya boleh huruf dan spasi.");
        return;
    }

    var regexKamar = /^[0-9]+$/;
    if (!regexKamar.test(kamar)) {
        alert("No Kamar hanya boleh angka.");
        return;
    }

    var regexHp = /^[0-9]+$/;
    if (!regexHp.test(hp)) {
        alert("No HP hanya boleh angka.");
        return;
    }

    var tabel = document.getElementById("tabelPenghuni");

    if (barisEdit) {
        // UPDATE: jika sedang edit, update baris lama
        barisEdit.cells[0].innerText = nama;
        barisEdit.cells[1].innerText = kamar;
        barisEdit.cells[2].innerText = hp;
        barisEdit = null;
        document.getElementById("formPenghuni").reset();
        return;
    }

    // CREATE: tambah baris baru
    var baris = tabel.insertRow();
    baris.insertCell(0).innerText = nama;
    baris.insertCell(1).innerText = kamar;
    baris.insertCell(2).innerText = hp;

    var kolomAksi = baris.insertCell(3);

    // Tombol Edit
    var tombolEdit = document.createElement("button");
    tombolEdit.innerText = "Edit";
    tombolEdit.onclick = function() {
        // Isi inputan form dengan data baris
        document.getElementById("nama").value = baris.cells[0].innerText;
        document.getElementById("kamar").value = baris.cells[1].innerText;
        document.getElementById("hp").value = baris.cells[2].innerText;
        barisEdit = baris; // tandai baris yang diedit
    };

    // Tombol Hapus
    var tombolHapus = document.createElement("button");
    tombolHapus.innerText = "Hapus";
    tombolHapus.onclick = function() { baris.remove(); };

    kolomAksi.appendChild(tombolEdit);
    kolomAksi.appendChild(document.createTextNode(" ")); // spasi
    kolomAksi.appendChild(tombolHapus);

    document.getElementById("formPenghuni").reset();
}