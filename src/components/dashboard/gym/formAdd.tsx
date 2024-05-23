'use client';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import ParentCard from '@/components/dashboard/parentCard';
import CustomTextField from '@/components/forms/CustomTextField';
import CustomFormLabel from '@/components/forms/CustomFormLabel';
import Button from '@mui/material/Button';
import RouterLink from 'next/link';
import { paths } from '@/paths';
import { Stack } from '@mui/material';
import { useInsertGym } from './action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormAdd(): React.JSX.Element {
    const { insertGym, loading } = useInsertGym();
    const [gymName, setGymName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [place, setPlace] = React.useState('');
    const [openTime, setOpenTime] = React.useState('');
    const [closeTime, setCloseTime] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState<File | null>(null);
    const [facilities, setFacilities] = React.useState([{ fac: '', icon: '' }]);
    const [packages, setPackages] = React.useState([
        { name: '', yearly: '', monthly: '', feature: [ { feature: '' } ] },
    ]);

    const handleFacilityChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newFacilities = facilities.map((facility, i) => {
            if (i === index) {
                return { ...facility, [event.target.name]: event.target.value };
            }
            return facility;
        });
        setFacilities(newFacilities);
    };

    const handlePackageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newPackages = packages.map((pkg, i) => {
            if (i === index) {
                return { ...pkg, [event.target.name]: event.target.value };
            }
            return pkg;
        });
        setPackages(newPackages);
    };

    const handleFeatureChange = (pkgIndex: number, featureIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newPackages = packages.map((pkg, i) => {
            if (i === pkgIndex) {
                const newFeatures = pkg.feature.map((feature, j) => {
                    if (j === featureIndex) {
                        return { ...feature, feature: event.target.value };
                    }
                    return feature;
                });
                return { ...pkg, feature: newFeatures };
            }
            return pkg;
        });
        setPackages(newPackages);
    };

    const addFacility = () => {
        setFacilities([...facilities, { fac: '', icon: '' }]);
    };

    const removeFacility = (index: number) => {
        if (facilities.length === 1) {
            return;
        }
        const newFacilities = facilities.filter((_, i) => i !== index);
        setFacilities(newFacilities);
    };

    const addPackage = () => {
        setPackages([...packages, { name: '', yearly: '', monthly: '', feature: [{ feature: '' }] }]);
    };

    const removePackage = (index: number) => {
        if (packages.length === 1) {
            return;
        }
        const newPackages = packages.filter((_, i) => i !== index);
        setPackages(newPackages);
    };

    const addFeature = (pkgIndex: number) => {
        const newPackages = packages.map((pkg, i) => {
            if (i === pkgIndex) {
                return { ...pkg, feature: [...pkg.feature, { feature: '' }] };
            }
            return pkg;
        });
        setPackages(newPackages);
    };

    const removeFeature = (pkgIndex: number, featureIndex: number) => {
        if (packages[pkgIndex].feature.length === 1) {
            return;
        }
        const newPackages = packages.map((pkg, i) => {
            if (i === pkgIndex) {
                const newFeatures = pkg.feature.filter((_, j) => j !== featureIndex);
                return { ...pkg, feature: newFeatures };
            }
            return pkg;
        });
        setPackages(newPackages);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', gymName);
        formData.append('location', location);
        formData.append('place', place);
        formData.append('open_close_time', `${openTime} - ${closeTime}`);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
    
        type FacilityObject = {
            [key: number]: {
                fac: string;
                icon: string;
            };
        };
    
        const facilitiesObject: FacilityObject = facilities.reduce((acc, facility, index) => {
            acc[index] = facility;
            return acc;
        }, {} as FacilityObject);
    
        const facilitiesWrapper = { facilities: facilitiesObject };
        formData.append('facilities', JSON.stringify(facilitiesWrapper));
    
        type PackageObject = {
            [key: string]: {
                price: {
                    yearly: string;
                    monthly: string;
                };
                feature: {
                    [key: number]: string;
                };
            };
        };
    
        const packagesObject: PackageObject = packages.reduce((acc, pkg) => {
            const featuresObject = pkg.feature.reduce((featuresAcc, feature, featureIndex) => {
                featuresAcc[featureIndex] = feature.feature;
                return featuresAcc;
            }, {} as { [key: number]: string });
    
            acc[pkg.name] = {
                price: {
                    yearly: pkg.yearly,
                    monthly: pkg.monthly,
                },
                feature: featuresObject,
            };
            return acc;
        }, {} as PackageObject);
    
        const packagesWrapper = { package: packagesObject };
        formData.append('packages', JSON.stringify(packagesWrapper));
        formData.append('created_at', new Date().toISOString());
        formData.append('updated_at', new Date().toISOString());
    
        if (
            gymName === '' ||
            location === '' ||
            place === '' ||
            openTime === '' ||
            closeTime === '' ||
            description === '' ||
            !image ||
            facilities[0].fac === '' ||
            facilities[0].icon === '' ||
            packages[0].name === '' ||
            packages[0].yearly === '' ||
            packages[0].monthly === '' ||
            packages[0].feature[0].feature === ''
        ) {
            toast.error('All fields are required');
            return;
        }
    
        insertGym(formData);
    };
    
  

    return (
        <Grid item>
            <ParentCard title="Form Add Gym">
                <CustomFormLabel sx={{ mt: 0 }} htmlFor="gymName">Gym Name</CustomFormLabel>
                <CustomTextField
                    id="gymName"
                    name="gymName"
                    variant="outlined"
                    placeholder="Input Gym Name"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGymName(e.target.value)}
                />
                <CustomFormLabel sx={{ mt: 2 }} htmlFor="location">Location</CustomFormLabel>
                <CustomTextField
                    id="location"
                    name="location"
                    variant="outlined"
                    placeholder="Input Location Coordinates (Latitude, Longitude)"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                />
                <CustomFormLabel sx={{ mt: 2 }} htmlFor="place">Place</CustomFormLabel>
                <CustomTextField
                    id="place"
                    name="place"
                    variant="outlined"
                    placeholder="Input Place"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlace(e.target.value)}
                />
                <CustomFormLabel sx={{ mt: 2 }} htmlFor="openTime">Open Time</CustomFormLabel>
                <CustomTextField
                    id="openTime"
                    name="openTime"
                    variant="outlined"
                    type="time"
                    placeholder="Input Open Time"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOpenTime(e.target.value)}
                />
                <CustomFormLabel sx={{ mt: 2 }} htmlFor="closeTime">Close Time</CustomFormLabel>
                <CustomTextField
                    id="closeTime"
                    name="closeTime"
                    type="time"
                    variant="outlined"
                    placeholder="Input Close Time"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCloseTime(e.target.value)}
                />
                <CustomFormLabel sx={{ mt: 2 }} htmlFor="description">Description</CustomFormLabel>
                <CustomTextField
                    id="description"
                    name="description"
                    variant="outlined"
                    placeholder="Input Description"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                />
                <CustomFormLabel sx={{ mt: 2 }} htmlFor="image">Image</CustomFormLabel>
                <input type="file" id="image" name="image" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.files ? e.target.files[0] : null)} />
                <CustomFormLabel sx={{ mt: 2 }} htmlFor="facilities">Facilities</CustomFormLabel>
                {facilities.map((facility, index) => (
                    <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <CustomTextField
                                id={`facility-${index}`}
                                name="fac"
                                variant="outlined"
                                placeholder="Facility"
                                value={facility.fac}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFacilityChange(index, e)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id={`icon-${index}`}
                                name="icon"
                                variant="outlined"
                                placeholder="Icon"
                                value={facility.icon}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFacilityChange(index, e)}
                                fullWidth
                            />
                        </Grid>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeFacility(index)}
                            sx={{ mt: 2, ml: 2 }}
                        >
                            Remove Facility
                        </Button>
                    </Grid>
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addFacility}
                    sx={{ mt: 2 }}
                >
                    Add Facility
                </Button>
                <CustomFormLabel sx={{ mt: 4 }} htmlFor="packages">Packages</CustomFormLabel>
                {packages.map((pkg, pkgIndex) => (
                    <Grid container spacing={2} key={pkgIndex} sx={{ mb: 2 }}>
                        <Grid item xs={12}>
                            <CustomTextField
                                id={`package-name-${pkgIndex}`}
                                name="name"
                                variant="outlined"
                                placeholder="Package Name"
                                value={pkg.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePackageChange(pkgIndex, e)}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id={`package-yearly-${pkgIndex}`}
                                name="yearly"
                                variant="outlined"
                                placeholder="Yearly Price"
                                value={pkg.yearly}
                                type="number"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePackageChange(pkgIndex, e)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField
                                id={`package-monthly-${pkgIndex}`}
                                name="monthly"
                                variant="outlined"
                                type="number"
                                placeholder="Monthly Price"
                                value={pkg.monthly}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePackageChange(pkgIndex, e)}
                                fullWidth
                            />
                        </Grid>
                        <CustomFormLabel sx={{ mt: 2, ml: 2 }} htmlFor={`package-features-${pkgIndex}`}>Features</CustomFormLabel>
                        {pkg.feature.map((feature, featureIndex) => (
                            <Grid container spacing={2} key={featureIndex} sx={{ mb: 2, ml: 0 }}>
                                <Grid item xs={10}>
                                    <CustomTextField
                                        id={`feature-${pkgIndex}-${featureIndex}`}
                                        name="feature"
                                        variant="outlined"
                                        placeholder="Feature"
                                        value={feature.feature}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFeatureChange(pkgIndex, featureIndex, e)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => removeFeature(pkgIndex, featureIndex)}
                                        sx={{ height: '100%' }}
                                    >
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addFeature(pkgIndex)}
                            sx={{ mt: 2, ml: 2 }}
                        >
                            Add Feature
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removePackage(pkgIndex)}
                            sx={{ mt: 2, ml: 2 }}
                        >
                            Remove Package
                        </Button>
                    </Grid>
                ))}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }} justifyContent="space-between">
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addPackage}
                            sx={{ mt: 2 }}
                        >
                            Add Package
                        </Button>
                    </>
                    <Stack sx={{ mt: 2 }} direction="row" spacing={2}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                            Submit
                        </Button>
                        <Button variant="contained" color="secondary" component={RouterLink} href={paths.dashboard.gym}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </ParentCard>
        </Grid>
    );
}
