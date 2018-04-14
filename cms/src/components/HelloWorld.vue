<template>
  <div class="hello">
    <h1>Prejudicely</h1>
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-layout row>
            <v-flex xs12>
              <textarea class="form" :value="article" @input="startAnimate" v-on:input="typing"></textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <h3>감수성 검사기</h3>
    <div>
      <div class="span">
        <div class="square" style="background-color: red"></div>
        <div class="type">여성</div>
        <div class="square" style="background-color: blue"></div>
        <div class="type">성소수자</div>
        <div class="square" style="background-color: purple"></div>
        <div class="type">장애인</div>
        <div class="square" style="background-color: orange"></div>
        <div class="type">지방/지역</div>
        <div class="square" style="background-color: yellow"></div>
        <div class="type">외국인/인종</div>
      </div>
    </div>
    <div class="text" v-html="$options.filters.highlight(article)">{{ article }}</div>
    <h3>감수성 점수</h3>
    <animate-number class="num" ref="myNum" :from="from" :to="to" mode="manual" :animate-end="animatedEnd"></animate-number>
  </div>
</template>

<script>
export default {
  data() {
    return {
      censoredWordsFem: ["김치녀", "워킹맘"],
      censoredWordsLGBT: ["똥꼬충"],
      censoredWordsDisabled: ["병신"],
      censoredWordsLocal: ["고담시"],
      censoredWordsEthics: ["짱개"],
      article: "",
      from: 0,
      to: 100,
      changing: false
    };
  },
  computed: {
    score() {
      let total = 100;
      this.censoredWordsFem.forEach(word => {
        if (this.article.includes(word)) {
          total -= 10;
        }
      });
      this.censoredWordsLGBT.forEach(word => {
        if (this.article.includes(word)) {
          total -= 10;
        }
      });
      this.censoredWordsDisabled.forEach(word => {
        if (this.article.includes(word)) {
          total -= 10;
        }
      });
      this.censoredWordsLocal.forEach(word => {
        if (this.article.includes(word)) {
          total -= 10;
        }
      });
      this.censoredWordsEthics.forEach(word => {
        if (this.article.includes(word)) {
          total -= 10;
        }
      });
      return total;
    }
  },
  filters: {
    highlight: function(word) {
      const censoredWordsFem = ["김치녀", "워킹맘"];
      const censoredWordsLGBT = ["똥꼬충"];
      const censoredWordsDisabled = ["병신"];
      const censoredWordsLocal = ["고담시"];
      const censoredWordsEthics = ["짱개"];
      censoredWordsFem.forEach(query => {
        let check = new RegExp(query, "ig");
        word = word.toString().replace(check, function(matchedText, a, b) {
          return "<span class='fem'>" + matchedText + "</span>";
        });
      });
      censoredWordsLGBT.forEach(query => {
        let check = new RegExp(query, "ig");
        word = word.toString().replace(check, function(matchedText, a, b) {
          return "<span class='lgbt'>" + matchedText + "</span>";
        });
      });
      censoredWordsDisabled.forEach(query => {
        let check = new RegExp(query, "ig");
        word = word.toString().replace(check, function(matchedText, a, b) {
          return "<span class='disabled'>" + matchedText + "</span>";
        });
      });
      censoredWordsLocal.forEach(query => {
        let check = new RegExp(query, "ig");
        word = word.toString().replace(check, function(matchedText, a, b) {
          return "<span class='local'>" + matchedText + "</span>";
        });
      });
      censoredWordsEthics.forEach(query => {
        let check = new RegExp(query, "ig");
        word = word.toString().replace(check, function(matchedText, a, b) {
          return "<span class='ethics'>" + matchedText + "</span>";
        });
      });
      return word;
    }
  },
  methods: {
    typing(e) {
      this.article = e.target.value;
    },
    startAnimate: function() {
      if (!this.changing) {
        this.$refs.myNum.reset(this.from, this.score);
        this.to = this.score;
        this.changing = true;
        this.$refs.myNum.start();
      }
    },
    animatedEnd() {
      this.from = this.to;
      this.$refs.myNum.reset(this.to, this.to);
      this.changing = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-size: 30px;
  font-weight: 800;
}

h3 {
  font-size: 30px;
  margin: 16px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.num {
  font-size: 48px;
  text-align: center;
  display: block;
  color: #5f4b8b;
  margin-top: -20px;
}

.text {
  font-size: 20px;
  margin-top: 20px;
  border: 2px solid black;
  height: 100px;
  margin-right: 35px;
  margin-left: 35px;
  padding: 10px;
  text-align: left;
}

.form {
  width: 100%;
  height: 100px;
  padding: 13px;
  resize: none;
  overflow: auto;
  border: none;
  outline: none;
  border: 2px solid black;
}

.square {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.type {
  display: inline-block;
  font-size: 18px;
  font-weight: 800;
  vertical-align: middle;
  margin-right: 10px;
}
</style>
