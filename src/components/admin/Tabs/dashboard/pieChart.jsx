import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Detalle from "./detalle";
import { Card, CardContent, Container, Grid, Typography } from '@material-ui/core'

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 10) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name.substr(0, 10)}...</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Visitas ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </>
  );
};
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#CD5C5C', '#808000', '#008080', '#000080', '#FF00FF', '#800080'];

export default class Dashboard extends PureComponent {

  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };
  render() {
    return (
      <>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Container maxWidth="lg" style={{ paddingTop: 20 }}>
              <Card>
                <CardContent>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Typography variant="h5" >
                      Total visitas a la página : {this.props.access}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Container>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <PieChart width={400} height={400}>
                <Pie
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  data={this.props.data.slice(0, 10)}
                  cx={200}
                  cy={200}
                  innerRadius={60}
                  outerRadius={80}
                  fill='#00C49F'
                  dataKey="access"
                  onMouseEnter={this.onPieEnter}
                >
                  {
                    this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
              </PieChart>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {this.props.data[this.state.activeIndex].name &&
              <Detalle
                name={this.props.data[this.state.activeIndex].name}
                desc={this.props.data[this.state.activeIndex].desc}
                img={this.props.data[this.state.activeIndex].img}
                model={this.props.data[this.state.activeIndex].model}
                value={this.props.data[this.state.activeIndex].value}
                access={this.props.data[this.state.activeIndex].access}
              />}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Container maxWidth="lg" style={{ paddingTop: 20 }}>
            <Grid container direction="row" justify="center" alignItems="center">
              <Typography variant="h5" >
                Total de visitas por productos
                  </Typography>
            </Grid>
          </Container>
          <BarChart
            width={700}
            height={300}
            data={this.props.data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="access" fill='#00C49F' />
          </BarChart>
        </Grid>
      </>
    );
  }
}
