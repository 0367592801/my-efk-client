import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './supportedFile/Book.css';
import { getDetailLesson, getPage } from '../Service/api';
import { apiUrl } from '../const/apiUrl';
import { SoundTwoTone } from '@ant-design/icons';
import { soundManager } from 'soundmanager2';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ReactPlayer from 'react-player';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
      pageIndex: 0,
      sounds: null,
      IdSoundPlaying: null,
      pressCount: 0,
      playVideo: false,
    };
  }

  componentDidMount() {
    this.getPages(this.props.match.params.lessonId);
  }

  componentWillUnmount() {
    soundManager.stopAll();
  }

  getPages = async (id) => {
    try {
      let res = await getDetailLesson(id);
      await this.setState({ book: res.data.pages });
      console.log(res);
      await this.getSounds(res.data.pages[0].id);
    } catch (e) {}
  };

  getSounds = async (id) => {
    try {
      let res = await getPage(id);
      await this.setState({ sounds: res.data.sounds });
    } catch (e) {}
  };

  priviouPage = async () => {
    await this.setState({ pageIndex: this.state.pageIndex - 1 });
    await this.getSounds(this.state.book[this.state.pageIndex].id);
    soundManager.stopAll();
  };

  nextPage = async () => {
    await this.setState({ pageIndex: this.state.pageIndex + 1 });
    await this.getSounds(this.state.book[this.state.pageIndex].id);
    soundManager.stopAll();
  };

  playSound = async (item) => {
    console.log(item.sound_file[0]);
    console.log(item.sound_file[0].url);
    if (this.state.IdSoundPlaying !== item.id) {
      soundManager.stopAll();
      await this.setState({ pressCount: 0 });
      await soundManager.setup({
        // url: "/path/to/swf-files/",
        onready: function () {
          let audio = soundManager.createSound({
            id: item.id,
            url: `${item.sound_file[0].url}`,
          });
          audio.play();
          console.log(audio);
        },
      });
    } else {
      await this.setState({ pressCount: this.state.pressCount + 1 });
      if (this.state.pressCount % 2 !== 0) {
        soundManager.pause(item.id);
      } else {
        soundManager.play(item.id);
      }
    }
    // console.log(soundManager.setup());
    await this.setState({ IdSoundPlaying: item.id });
  };

  playVideo = async () => {
    console.log('call video');
    await this.setState({ playVideo: true });
  };

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Menu />
        <Header content='Lets go!' />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            margin: '30px 0px',
          }}
        >
          {this.state.playVideo === false ? (
            <React.Fragment>
              {this.state.book !== null ? (
                <React.Fragment>
                  <span
                    style={{
                      display: this.state.pageIndex === 0 ? 'none' : 'block',
                    }}
                    className='button'
                    onClick={() => this.priviouPage()}
                  >
                    <ArrowLeftIcon style={{ fontSize: '60px' }} />
                  </span>
                  {this.state.book.length > 0 ? (
                    <React.Fragment>
                      <div
                        style={{
                          height: '800px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {this.state.sounds !== null &&
                        this.state.sounds.length > 0 ? (
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            {this.state.sounds.map((item, index) => {
                              return (
                                <SoundTwoTone
                                  style={{
                                    marginBottom: '100px',
                                    fontSize: '32px',
                                  }}
                                  key={index}
                                  onClick={() => this.playSound(item)}
                                />
                              );
                            })}
                          </div>
                        ) : (
                          ''
                        )}
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                        <img
                          // className="rotate"
                          alt=''
                          height='600px'
                          src={
                            this.state.book[this.state.pageIndex]
                              .image_background[0].url
                          }
                        />
                        <span
                          style={{
                            display:
                              this.state.pageIndex ===
                              this.state.book.length - 1
                                ? 'block'
                                : 'none',
                            textAlign: 'center'
                          }}
                          className='button'
                        >
                          <button
                            className='big-button homebutton'
                            style={{ marginTop: '50px' }}
                            onClick={() => this.playVideo()}
                          >
                            Watch practice video
                          </button>
                        </span>
                        </div>
                      </div>
                      <span
                        style={{
                          display:
                            this.state.pageIndex === this.state.book.length - 1
                              ? 'none'
                              : 'block',
                        }}
                        className='button'
                        onClick={() => this.nextPage()}
                      >
                        <ArrowRightIcon style={{ fontSize: '60px' }} />
                      </span>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              ) : (
                ''
              )}
            </React.Fragment>
          ) : (
            <ReactPlayer
              url={`${this.props.history.location.urlVideo}`}
              playing={true}
              controls={true}
            />
          )}
        </div>
        )
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(Book);
