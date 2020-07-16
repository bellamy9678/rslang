import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import { TEXT } from '../shared/Text';
import { GIT_URL } from '../shared/Constants';

const fab = new DOMElementCreator();

export default class About {
	makeContainer() {
		const wrapper = fab.create({
			elem: TAGS.DIV,
			classes: ['wrapper'],
		});
		this.container = wrapper;
	}

	static makeMember(member, index) {

		const img = fab.create({
			elem: TAGS.IMG,
			classes: 'member__image',
			attr: [
				{
					src: `./assets/images/we/${member.git}.jpg`,
				},
				{
					alt: member.name,
				},
			],
		});

		const header = fab.create({
			elem: TAGS.H3,
			classes: 'member__name',
			child : member.name
		});

		const git = fab.create({
			elem: TAGS.A,
			classes: 'member__git',
			attr: [
				{
					href: `${GIT_URL}${member.git}`,
				},

				{
					target: '_blank',
				},
			],
			child : member.git
		});

		const text = fab.create({
			elem: TAGS.P,
			classes: 'member__description',
			child : member.text
		});

		const container = fab.create({
			elem: TAGS.DIV,
			classes: ['member', ((index % 2 === 0) ? 'member_left' : 'member_right')],
			child : [img, header, git, text]
		});

		return container;
	}

	makeSectionOurTeam() {
		const img = fab.create({
			elem: TAGS.IMG,
			classes: 'our-team__image',
			attr: [
				{
					src: './assets/images/Feedback.svg',
				},
				{
					alt: 'our-team',
				},
			],
		});

		const header = fab.create({
			elem: TAGS.H1,
			classes: 'our-team__header',
			child : TEXT.aboutUsPage.title
		});

		const decription = fab.create({
			elem: TAGS.P,
			classes: 'our-team__description',
			child : TEXT.aboutUsPage.description
		});

		const container = fab.create({
			elem: TAGS.DIV,
			classes: 'our-team__container',
			child : [header, decription]
		});

		const section = fab.create({
			elem: TAGS.SECTION,
			classes: 'our-team',
			child : [container, img]
		});

		this.container.append(section);
	}

	makeSectionMembers() {

		const members = TEXT.aboutUsPage.command;
		const elements = members.map((member, index) => {
			return About.makeMember(member, index);
		});

		const section = fab.create({
			elem: TAGS.SECTION,
			classes: 'members',
			child : elements,
		});

		this.container.append(section);
	}

	makeSectionMentor() {
		const header = fab.create({
			elem: TAGS.H2,
			classes: 'mentor__header',
			child : TEXT.aboutUsPage.mentorHeader
		});

		const text = fab.create({
			elem: TAGS.P,
			classes: 'mentor__description',
			child : TEXT.aboutUsPage.mentorDescription
		});

		const img = fab.create({
			elem: TAGS.IMG,
			classes: 'mentor__image',
			attr: [
				{
					src: './assets/images/Feedback2.svg',
				},
				{
					alt: 'Feedback',
				},
			],
		});

		const mentor = About.makeMember(TEXT.aboutUsPage.mentor, 1);
		mentor.classList.add('member_mentor');

		const container = fab.create({
			elem: TAGS.SECTION,
			classes: 'mentor-container',
			child : [img, mentor],
		});

		const section = fab.create({
			elem: TAGS.SECTION,
			classes: 'mentor',
			child : [header, text, container],
		});

		this.container.append(section);
	}

	getPage() {
		this.makeContainer();
		this.makeSectionOurTeam();
		this.makeSectionMembers();
		this.makeSectionMentor();
		return this.container;
	}

}
