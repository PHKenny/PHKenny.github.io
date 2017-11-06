var vue = new Vue({
  el: "#main",
  data: {
    percentage: 0,
    status: false,
    total: 0,
    validate: false,
    validate2: false,
    notes: [],
    estimated: []
  },

  methods: {
    add_note: function(){
      if (parseInt(this.percentage) == 0){
        alert("Debe ingresar un porcentaje mayor a 0");
        return false;
      }
      total = 0;
      this.notes.forEach(function(value, index){
        total += value.percentage;
      });

      if (total == 100) {
        alert("Ya no puede ingresar más notas");
      } else if ((total + parseInt(this.percentage)) > 100 ){
        alert("Verifique el porcentaje que está ingresando, debido a que la suma total de porcentajes es mayor a 100");
      } else if (total < 100) {
        this.notes[this.notes.length] = { percentage: parseInt(this.percentage), note: 0 };
        this.percentage = 0;
      }

      this.set_total();
    },

    set_note: function(index){
      if (parseInt(this.notes[index].note) > 20 || parseInt(this.notes[index].note) < 0){
        alert("Debe ingresar una nota entre 01 y 20");
        this.notes[index].note = 0;
        return false;
      }
      this.notes[index].note = ((this.notes[index].note != "") ? parseInt(this.notes[index].note) : 0);

      flag = this.notes;
      this.notes = [];
      this.notes = flag;

      this.set_total();
      this.validator();
    },

    set_total: function(){
      total = 0;
      this.notes.forEach(function(value, index){
        total += parseInt(value.note) * (parseInt(value.percentage) / 100);
      });

      vue.total = total;
    },

    validator: function(){
      percentages = 0;
      this.notes.forEach(function(value, index){
        percentages += value.percentage;
      });

      console.log(percentages, this.total);
      if (percentages == 100){
        if (this.total < 9.5){
          vue.validate = true;

          counter = 0;
          this.notes.forEach(function(value, index){
            if (value.note == 0){
              counter++;
            }
          });

          if (counter == 0){
            vue.validate2 = false;
            return false;
          }

          if (flag){
            this.validate2 = true;
            remain = (9.5 - this.total) / counter;
            vue.estimated = [];
            this.notes.forEach(function(value, index){
              if (value.note == 0){
                if ((remain / ( parseInt(value.percentage) / 100 )) > 20) {
                  vue.validate2 = false;
                  return;
                }
                vue.estimated[vue.estimated.length] = { evaluation: index, note: (remain / ( parseInt(value.percentage) / 100 )) };
              }
            });
          }

          return false;
        }
      }

      vue.validate = false;
    }
  }
});