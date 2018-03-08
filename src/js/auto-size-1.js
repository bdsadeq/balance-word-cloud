function isGarbage(input) {
    var rxJapaneseCharacter = /([一-龠]){1,20}|([ぁ-ゔ]){2,20}|([ァ-ヴー]){2,20}|([a-zA-Z0-9]){2,20}|([ａ-ｚＡ-Ｚ０-９]){2,20}([々〆〤]){2,20}/u;
    return rxJapaneseCharacter.test(input);
}


function WordCloud() {
    var _this = this;

    this.w = $(window).width();
    this.h = $(window).height();

    this.color = ['#1e90ff', '#f08080', '#00ff7f'];
    this.color_sp = ['#00ccff', '#99ff00', '#ffff66'];

    this.color_with_text_index = {
        "noun": "#1e90ff"
    };

    this.render_cloud = function (nodes, tag_id, container_width, TEMP_MAX_SIZE) {

        var max_size = d3.max(nodes, function (n) {
            return n.size
        });

        var sizeScale = d3.scale.linear().domain([0, max_size]).range([15, 90]);

        var words = nodes.map(function (n) {
            return {
                name: n.name,
                text: n.name,
//                size: sizeScale(n.size),
                size: n.size,
                group: n.group,
                link: '#'
            }
        });

        d3.layout.cloud().size([container_width, 400])
                .words(words)
                .padding(1)
                .rotate(function () {
                    return 0;
                })
                .font('Impact')
                .fontSize(function (d) {
                    return (parseFloat(d.size) * TEMP_MAX_SIZE);
                })
                .on("end", function (nodes) {
                    d3.select(tag_id).append("svg")
                            .attr("width", container_width)
                            .attr("height", 400)
                            .append("g")
                            .attr("transform", "translate(" + parseInt(container_width / 2) + ", 200)")
                            .selectAll("text")
                            .data(nodes)
                            .enter().append("text")
                            .style("font-size", function (d) {
                                return d.size + "px";
                            })
                            .attr("text-anchor", "middle")
                            .style("font-family", "Impact")
                            .style("fill", function (d, i) {
                                return _this.color[d.group - 1];
//                                return _this.color_with_text_index[d.group];
                            })
                            .style("cursor", "pointer")
                            .attr("transform", function (d) {
                                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                            })
                            .text(function (d) {
                                return d.name;
                            })
                            .on("click", function (d, i) {
                                alert(d.text);
                            });
                })
                .start();
    }

}

function dashboard_hots_cloud(word_cloud_data)
{
    var word_cloud = new WordCloud();

    var cloud_data = [];

    var total_character = 0;
    jQuery.each(word_cloud_data, function (i, value) {
        if (isGarbage(value.name))
        {
            total_character = total_character + parseInt(value.name.length);
        }
    });


    var container_width = parseFloat(jQuery("#cloud-container").width());
    var container_height = 400;
    var area_per_character = 144;

    var TEMP_MAX_SIZE = ((container_width * container_height) / (area_per_character * total_character));

    jQuery.each(word_cloud_data, function (i, value) {
        if (isGarbage(value.name))
        {
            cloud_data.push({
                "name": value.name,
                "group": value.group,
                "size": Math.abs(Math.log(value.size + 1))
            });
        }

    });
    
    console.log(cloud_data);

    word_cloud.render_cloud(cloud_data, '#word-cloud', container_width, TEMP_MAX_SIZE);
}

function create_word_cloud(word_cloud_data)
{
    dashboard_hots_cloud(word_cloud_data);
}



$("document").ready(function () {

});



