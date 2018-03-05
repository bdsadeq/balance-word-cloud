function WordCloud() {
    var _this = this;

    this.w = $(window).width();
    this.h = $(window).height();

    this.color = ['#1e90ff', '#f08080', '#00ff7f'];

    this.render_cloud = function (nodes, tag_id, container_width, container_height) {

        var max_size = d3.max(nodes, function (n) {
            return n.size
        });
        var sizeScale = d3.scale.linear().domain([0, max_size]).range([15, 90]);

        var words = nodes.map(function (n) {
            return {
                name: n.name,
                size: n.size,
                group: n.group
            }
        });

        d3.layout.cloud().size([container_width, container_height])
                .words(words)
                .padding(1)
                .rotate(function () {
                    return 0;
                })
                .font('Impact')
                .fontSize(function (d) {
                    return d.size;
                })
                .on("end", function (nodes) {
                    d3.select(tag_id).append("svg")
                            .attr("width", container_width)
                            .attr("height", container_height)
                            .append("g")
                            .attr("transform", "translate(" + parseInt(container_width / 2) + ", " + parseInt(container_height / 2) + ")")
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
                                alert(d.name);
                            });
                })
                .start();
    }

}

function create_word_cloud(word_cloud_data)
{
    var word_cloud = new WordCloud();
    word_cloud.render_cloud(word_cloud_data, '#word-cloud', jQuery("#word-cloud").width(), 600);
}



$("document").ready(function () {

});



